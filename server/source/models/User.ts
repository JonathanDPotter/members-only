import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false,
  },

  displayName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  member: {
    type: Boolean,
    required: true,
  },

  admin: {
    type: Boolean,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("user", UserSchema);
