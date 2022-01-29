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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const NAMESPACE = "User Controller";
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { displayName } = body;
    const exists = yield User_1.default.findOne({ displayName });
    if (exists) {
        return res.status(500).json({ message: "Display name in use." });
    }
    else {
        const user = new User_1.default(Object.assign({}, body));
        const hash = yield bcrypt_1.default.hash(user.password, 10);
        user.password = hash;
        try {
            const result = yield user.save();
            return res.status(201).json({ user: result });
        }
        catch (error) {
            return res.status(500).json({ message: error.message, error });
        }
    }
});
const getAllUsers = (req, res, next) => {
    User_1.default.find()
        .exec()
        .then((result) => {
        return res.status(200).json({
            users: result,
            count: result.length,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName } = req.body;
    try {
        const result = yield User_1.default.findOneAndUpdate({ displayName }, Object.assign({}, req.body), { new: true }).exec();
        return res.status(200).json({ user: result });
    }
    catch (error) {
        return res.json({
            message: error.message,
            error,
        });
    }
});
exports.default = { createUser, getAllUsers, updateUser };
