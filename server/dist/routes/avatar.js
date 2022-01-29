"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const avatar_1 = __importDefault(require("../controllers/avatar"));
const Router = express_1.default.Router();
Router.post("/get/avatar", avatar_1.default.getAvatar);
exports.default = Router;
