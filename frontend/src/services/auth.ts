import axios from "axios";
import { LoginCredentials } from "../utils/types";
import { AUTH_BASE_URL } from "../utils/constants";

let token = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const login = async (credentials: LoginCredentials) => {
  const res = await axios.post(`${AUTH_BASE_URL}/login`, credentials);
  return res.data;
};

export default { setToken, login };
