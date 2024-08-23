import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";

// router.get("/",(req,res)=>{
//     res.send("Hey its user route");
// })
const authorizeUser = (req, res, next) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "You can only update your own account" });
  }
};
const authorizeForFollow = (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    next();
  } else {
    res.status(403).json({ error: "You cannot Follow/Unfollow Yourself" });
  }
};

//UPDATE user
router.put("/:id", authorizeUser, async (req, res) => {
  try {
    // Check if password is being updated
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    // Find and update the user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Returns the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Account has been updated", user });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE user
router.delete("/:id", authorizeUser, async (req, res) => {
  try {
    // Find and delete the user
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json("Account has been deleted");
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// query lh:8800/users/?usernam:sadsa
// GET user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// follow a User

router.put("/:id/follow", authorizeForFollow, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      res.status(200).json({ message: "user Has been followed successfully" });
    } else {
      res.status(403).json("You already Follow this User");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// unfllow a user

router.put("/:id/unfollow", authorizeForFollow, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (user.followers.includes(req.body.userId)) {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      res.status(200).json({ message: "user Has been unfollowed " });
    } else {
      res.status(403).json("You dont't Follow this User");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get Friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map(async (friendId) => {
        return await User.findById(friendId);
      })
    );

    let friendsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendsList);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
