import axios from "axios";
// types
import { InewMessage } from "../interfaces/message";
import { Icredentials, InewData, InewUser } from "../interfaces/user";

const getAuth = () => axios.get("/api/auth/get/auth");

const createUser = (user: InewUser) =>
  axios.post("/api/user/create/user", user);

const updateUser = (newData: InewData) =>
  axios.put("/api/user/update/user", newData);
const login = (credentials: Icredentials) =>
  axios.post("/api/auth/local", credentials);

const createMessage = (message: InewMessage) =>
  axios.post("/api/messages/create/message", message);

const getMessages = () => axios.get("/api/messages/get/messages");

const deleteMessage = (id: string) => {
  axios.post("/api/messages/delete/message", {_id: id});
};

const getAvatar = async (options: { gender: string, id: number }) => {
  const response = await axios.post("/api/avatar/get/avatar", options);
  return response;
}

const api = {
  getAuth,
  login,
  createUser,
  updateUser,
  createMessage,
  getMessages,
  deleteMessage,
  getAvatar
};

export default api;
