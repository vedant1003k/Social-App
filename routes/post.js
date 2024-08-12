import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

// router.get("/", (req, res) => {
//     res.send("Hi")
// });

// Create a new post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Update the post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body }, { new: true });
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("You can Only update your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete the post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("You can Only delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been unLiked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ message: post });
  } catch (error) {
    res.status(500).json(error);
  }
});
// get timeline posts
router.get("/timeline/all", async (req, res) => {
  try {
    // console.log("Received userId:", req.body.userId); Log the userId received
    const currentUser = await User.findById(req.body.userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map(async (friendId) => {
        return await Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (e) {
    console.error("Error fetching timeline:", e); // Log the error for debugging
    res.status(500).json({ error: e.message });
  }
});

export default router;
