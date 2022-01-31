import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/User";
import { PassportStatic } from "passport";

export default (passport: PassportStatic) => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL:
          "https://secure-reef-35994.herokuapp.com//api/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        const { id, displayName, name, photos } = profile;
        let image = "image";
        if (photos) image = photos[0].value;

        const newUser = {
          googleId: id,
          displayName,
          firstName: name?.givenName,
          lastName: name?.familyName,
          image,
          member: false,
          admin: false,
        };

        try {
          let user = await User.findOne({ googleId: id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.use(
    new LocalStrategy(
      { usernameField: "displayName" },
      async (displayName: string, password: string, done: any) => {
        const user = await User.findOne({ displayName });
        if (!user) {
          return done(null, false, {
            message: "No user with that display name.",
          });
        } else {
          try {
            if (await bcrypt.compare(password, user.password)) {
              return done(null, user);
            } else {
              return "Password incorrect.";
            }
          } catch (error: any) {
            return done(error);
          }
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((id, done) => User.findById(id, done));
};
