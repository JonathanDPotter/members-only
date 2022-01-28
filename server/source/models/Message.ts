import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("message", MessageSchema);
