import axios from "axios";
import { User } from "../utils/types";
import { API_BASE_URL } from "../utils/constants";
import authService from "./auth";

const getUsers = async (): Promise<User[]> => {
  const token = authService.getToken();

  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.get<User[]>(`${API_BASE_URL}/users`, config);

  return res.data;
};

export default { getUsers };
