"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toonAvatar = require("cartoon-avatar");
const getAvatar = (req, res) => {
    const { gender, id } = req.body;
    const avatar = toonAvatar.generate_avatar(gender, id);
    res.status(200).json(avatar);
};
exports.default = { getAvatar };
