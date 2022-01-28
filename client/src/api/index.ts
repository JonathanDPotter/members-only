import axios from "axios";
// types
import { Imessage } from "../interfaces/message";
import { Icredentials, InewUser } from "../interfaces/user";

const getAuth = () => axios.get("/api/auth/get/auth");

const createUser = (user: InewUser) =>
  axios.post("/api/user/create/user", user);

const login = (credentials: Icredentials) =>
  axios.post("/api/auth/local", credentials);

const createMessage = (message: Imessage) =>
  axios.post("/api/messages/create/message", message);

const getMessages = () => axios.get("/api/messages/get/messages");

export default { getAuth, login, createUser, createMessage, getMessages };
