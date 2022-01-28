import axios from "axios";
import { Icredentials, InewUser } from "../interfaces/user";

const getAuth = () => axios.get("/api/auth/get/auth");
const createUser = (user: InewUser) =>
  axios.post("/api/user/create/user", user);
const login = (credentials: Icredentials) =>
  axios.post("/api/auth/local", credentials);

export default { getAuth, createUser, login };
