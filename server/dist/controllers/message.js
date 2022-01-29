"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../models/Message"));
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield Message_1.default.create(req.body);
    try {
        const result = yield message.save();
        return res.status(201).json({ user: result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, error });
    }
});
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield Message_1.default.find().exec();
        return res.status(200).json({ messages });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, error });
    }
});
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Message_1.default.findByIdAndDelete(req.body).exec();
        res.status(204);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.default = { createMessage, getMessages, deleteMessage };
