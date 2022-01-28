import { Document } from "mongoose";

export interface InewMessage {
  author: string;
  title: string;
  body: string;
  createdAt: number;
}

export interface Imessage extends Document {
  _id: string;
  author: string;
  title: string;
  body: string;
  createdAt: number;
}
