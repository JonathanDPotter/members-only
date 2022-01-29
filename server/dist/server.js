"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const express_flash_1 = __importDefault(require("express-flash"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
//routes
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const message_1 = __importDefault(require("./routes/message"));
const avatar_1 = __importDefault(require("./routes/avatar"));
// utils
const db_1 = __importDefault(require("./config/db"));
const passport_2 = __importDefault(require("./config/passport"));
// setup .env file and get variables
dotenv_1.default.config();
const { PORT, NODE_ENV, MONGO_URI, SESSION_SECRET } = process.env;
// connect to mongo
(0, db_1.default)();
// create server
const server = (0, express_1.default)();
// parse requests
server.use(express_1.default.urlencoded());
server.use(express_1.default.json());
// logging with morgan set for dev only
if (NODE_ENV === "development")
    server.use((0, morgan_1.default)("dev"));
// set flash
server.use((0, express_flash_1.default)());
// set express-session
server.use((0, express_session_1.default)({
    secret: SESSION_SECRET !== null && SESSION_SECRET !== void 0 ? SESSION_SECRET : "secret",
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: MONGO_URI !== null && MONGO_URI !== void 0 ? MONGO_URI : "URI" }),
}));
// config passport and set passport middleware
(0, passport_2.default)(passport_1.default);
server.use(passport_1.default.initialize());
server.use(passport_1.default.session());
// routes
server.use("/api/auth", auth_1.default);
server.use("/api/user", user_1.default);
server.use("/api/messages", message_1.default);
server.use("/api/avatar", avatar_1.default);
// setup static folder for react app
server.use(express_1.default.static(path_1.default.resolve(__dirname, "../client/build")));
server.get("*", function (request, response) {
    response.sendFile(path_1.default.resolve(__dirname, "../client/build", "index.html"));
});
server.listen(PORT !== null && PORT !== void 0 ? PORT : 1234, () => console.log(`Server running in ${NODE_ENV} on port ${PORT}`));
