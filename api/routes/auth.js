import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";

//REGISTER
router.post("/register", async (req, res) => {
  // res.send("Hey its auth route");

  try {
    //generate new Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //generate user
    const newUser = new User({
      ...req.body, // Spread the request body to capture all fields dynamically
      password: hashedPassword, // Override the password field with the hashed password
    });

    const user = await newUser.save();
    res.status(200).send(user);
  } catch (e) {
    // console.log(e);
    res.status(500).json(e);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Wrong password"); // Add return here
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
