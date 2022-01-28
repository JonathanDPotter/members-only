import { NextFunction, Request, Response } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/User";
import { Error } from "mongoose";

interface InewLocal {
  displayName: string;
  password: string;
  firstName: string;
  lastName: string;
}

const getAuth = (req: Request, res: Response) => {
  console.log("getting user", req.user);
  res.send(req.user);
};

const logOut = (req: Request, res: Response) => {
  req.logout();
  res.redirect("back");
};

const localAuth = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "back",
    failureFlash: true,
  });
};

export default { getAuth, logOut, localAuth };
