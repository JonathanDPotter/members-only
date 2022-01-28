import { Request, Response } from "express";
import Message from "../models/Message";

const createMessage = async (req: Request, res: Response) => {
  const message = await Message.create(req.body);
  try {
    const result = await message.save();
    return res.status(201).json({ user: result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, error });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().exec();
    return res.status(200).json({ messages });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, error });
  }

  // Message.find()
  //   .exec()
  //   .then((result: any) => {
  //     return res.status(200).json({
  //       users: result,
  //       count: result.length,
  //     });
  //   })
  //   .catch((error: Error) => {
  //     return res.status(500).json({
  //       message: error.message,
  //       error,
  //     });
  //   });
};

export default { createMessage, getMessages };
