import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  
  author: {
    type: String,
    required: true,
  },
  
  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("message", MessageSchema);
