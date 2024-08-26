import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationid: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", MessageSchema);
