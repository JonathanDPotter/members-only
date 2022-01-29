import express from "express";
import controller from "../controllers/avatar";

const Router = express.Router();

Router.post("/get/avatar", controller.getAvatar);

export default Router;
