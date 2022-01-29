"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            res.redirect("/");
        }
    },
    ensureGuest: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect("dashboard");
        }
        else {
            return next();
        }
    },
};
