import express from "express";
import { Conversation } from "../models/Conversation.js";
const router = express.Router();

//new Conv
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//get Con of user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {
        $in: [req.params.userId],
      },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
