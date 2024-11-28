import axios from "axios";
import { LoginCredentials } from "../types";
const baseUrl = "http://localhost:3000/auth";

let token = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const login = async (credentials: LoginCredentials) => {
  const res = await axios.post(`${baseUrl}/login`, credentials);
  return res.data;
};

export default { setToken, login };
