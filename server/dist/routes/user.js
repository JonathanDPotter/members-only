"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.post("/create/user", user_1.default.createUser);
router.get("/get/users", user_1.default.getAllUsers);
router.put("/update/user", user_1.default.updateUser);
module.exports = router;
