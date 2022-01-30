import express, { Request, Response } from "express";
import passport from "passport";
import controller from "../controllers/auth";

const Router = express.Router();

Router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

Router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/signup",
  }),
  (req: Request, res: Response) => {
    res.redirect("/");
  }
);

Router.post(
  "/local",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true,
    successFlash: true,
  })
);

Router.get("/logout", controller.logOut);

Router.get("/get/auth", controller.getAuth);

export default Router;
