import { NextFunction, Request, Response } from "express";

module.exports = {
  ensureAuth: (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      res.redirect("dashboard");
    } else {
      return next();
    }
  },
};
