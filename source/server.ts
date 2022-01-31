import express, { NextFunction, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
//routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import messageRoutes from "./routes/message";
import avatarRoutes from "./routes/avatar";
// utils
import connectDB from "./config/db";
import passportConfig from "./config/passport";

// setup .env file and get variables
dotenv.config();

const { PORT, NODE_ENV, MONGO_URI, SESSION_SECRET } = process.env;

// connect to mongo
connectDB();

// create server
const server = express();

// parse requests
server.use(express.urlencoded());
server.use(express.json());

// logging with morgan set for dev only
if (NODE_ENV === "development") server.use(morgan("dev"));

// important for cors functionality (I think)
server.set("trust proxy", 1);

// set express-session
server.use(
  session({
    secret: SESSION_SECRET ?? "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI ?? "URI" }),
    cookie: { sameSite: "none", secure: true },
  })
);

// config passport and set passport middleware
passportConfig(passport);

server.use(passport.initialize());

server.use(passport.session());

// cors
const whitelist: string[] = [
  "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=https%3A%2F%2Fsecure-reef-35994.herokuapp.com%2Fundefined%2Fapi%2Fauth%2Fgoogle&scope=profile&client_id=1085757713654-5hllkudhdbui81f0tkj43ne5cr79jqrj.apps.googleusercontent.com",
  "https://secure-reef-35994.herokuapp.com/api/auth/google",
  "https://secure-reef-35994.herokuapp.com", "*"
];

server.use(
  cors({
    origin: whitelist,
    credentials: true,
  })
);

// trust proxy
server.enable("trustProxy");

// routes
server.use("/api/auth", authRoutes);
server.use("/api/user", userRoutes);
server.use("/api/messages", messageRoutes);
server.use("/api/avatar", avatarRoutes);

// serve static files if in production
if (NODE_ENV === "production") {
  server.use(express.static("client/build"));

  server.get("/*", (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

server.listen(PORT ?? 1234, () =>
  console.log(`Server running in ${NODE_ENV} on port ${PORT}`)
);
