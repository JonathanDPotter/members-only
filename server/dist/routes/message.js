"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("../controllers/message"));
const Router = express_1.default.Router();
Router.post("/create/message", message_1.default.createMessage);
Router.get("/get/messages", message_1.default.getMessages);
Router.post("/delete/message", message_1.default.deleteMessage);
exports.default = Router;
