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

const update = async (id: string, userData: Partial<User>) => {
  const token = authService.getToken();

  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.put<User>(
    `${API_BASE_URL}/users/${id}`,
    userData,
    config
  );
  return res.data;
};

const remove = async (id: string) => {
  const token = authService.getToken();

  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${API_BASE_URL}/users/${id}`, config);
};

export default { getUsers, update, remove };
