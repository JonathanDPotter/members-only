import { Request, Response, NextFunction } from "express";
import mongoose, { Error } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const NAMESPACE = "User Controller";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  console.log(body);
  const { displayName } = body;
  const exists = await User.findOne({ displayName });

  if (exists) return res.status(500).json({ message: "Display name in use." });

  const user = new User({
    ...body,
  });

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  try {
    const result = await user.save();
    return res.status(201).json({ user: result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, error });
  }
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id, newInfo } = req.body;
  return User.findByIdAndUpdate(id, newInfo)
    .exec()
    .then((result: any) => {
      return res.status(200).json({ user: result });
    })
    .catch((error: Error) => {
      return res.json({
        message: error.message,
        error,
      });
    });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .exec()
    .then((result: any) => {
      return res.status(200).json({
        users: result,
        count: result.length,
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { createUser, getAllUsers, updateUser };
