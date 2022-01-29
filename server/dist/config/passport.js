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
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
exports.default = (passport) => {
    var _a, _b;
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: (_a = process.env.GOOGLE_CLIENT_ID) !== null && _a !== void 0 ? _a : "",
        clientSecret: (_b = process.env.GOOGLE_CLIENT_SECRET) !== null && _b !== void 0 ? _b : "",
        passReqToCallback: true,
        callbackURL: "/api/auth/google/callback",
    }, (request, _accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, displayName, name, photos } = profile;
        let image = "image";
        if (photos)
            image = photos[0].value;
        const newUser = {
            googleId: id,
            displayName,
            firstName: name === null || name === void 0 ? void 0 : name.givenName,
            lastName: name === null || name === void 0 ? void 0 : name.familyName,
            image,
            member: false,
            admin: false,
        };
        try {
            let user = yield User_1.default.findOne({ googleId: id });
            if (user) {
                done(null, user);
            }
            else {
                user = yield User_1.default.create(newUser);
                done(null, user);
            }
        }
        catch (error) {
            console.error(error);
        }
    })));
    passport.use(new passport_local_1.Strategy({ usernameField: "displayName" }, (displayName, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ displayName });
        if (!user) {
            return done(null, false, {
                message: "No user with that display name.",
            });
        }
        else {
            try {
                if (yield bcrypt_1.default.compare(password, user.password)) {
                    return done(null, user);
                }
                else {
                    return "Password incorrect.";
                }
            }
            catch (error) {
                return done(error);
            }
        }
    })));
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((id, done) => User_1.default.findById(id, done));
};
