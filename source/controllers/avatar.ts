import { Request, Response } from "express";
const toonAvatar = require("cartoon-avatar");


const getAvatar = (req: Request, res: Response) => {
  const { gender, id } = req.body;
  const avatar = toonAvatar.generate_avatar(gender, id);
  res.status(200).json(avatar);
}

export default { getAvatar };
