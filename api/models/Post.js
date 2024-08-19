import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
      default: false,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
