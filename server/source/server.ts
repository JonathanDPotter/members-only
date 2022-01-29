import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
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

// set flash
server.use(flash());

// set express-session
server.use(
  session({
    secret: SESSION_SECRET ?? "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI ?? "URI" }),
  })
);

// config passport and set passport middleware
passportConfig(passport);

server.use(passport.initialize());

server.use(passport.session());

// routes
server.use("/api/auth", authRoutes);
server.use("/api/user", userRoutes);
server.use("/api/messages", messageRoutes);
server.use("/api/avatar", avatarRoutes);

// setup static folder for react app
server.use(express.static(path.resolve(__dirname, "../client/build")));
server.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

server.listen(PORT ?? 1234, () =>
  console.log(`Server running in ${NODE_ENV} on port ${PORT}`)
);
