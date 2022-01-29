"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("../controllers/auth"));
const Router = express_1.default.Router();
Router.get("/google", passport_1.default.authenticate("google", { scope: ["profile"] }));
Router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "http://localhost:3000/signup",
}), (req, res) => {
    res.redirect("http://localhost:3000");
});
Router.post("/local", passport_1.default.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/fail",
    failureFlash: true,
    successFlash: true,
}));
Router.get("/logout", auth_1.default.logOut);
Router.get("/get/auth", auth_1.default.getAuth);
exports.default = Router;
