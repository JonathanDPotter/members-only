import express, { Request, Response } from "express";
import controller from "../controllers/message";

const Router = express.Router();

Router.post("/create/message", controller.createMessage);

Router.get("/get/messages", controller.getMessages);

export default Router;
