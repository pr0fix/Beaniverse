import axios from "axios";
import authService from "./auth";
import { API_BASE_URL } from "../utils/constants";
import { Coffee, NewCoffee } from "../utils/types";

const getAll = async (): Promise<Coffee[]> => {
  const res = await axios.get<Coffee[]>(`${API_BASE_URL}/coffee`);
  return res.data;
};

const addNew = async (coffee: NewCoffee): Promise<Coffee> => {
  const token = authService.getToken();

  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post<Coffee>(
    `${API_BASE_URL}/coffee`,
    coffee,
    config
  );
  return res.data;
};

const update = async (id: string, coffee: Partial<Coffee>): Promise<Coffee> => {
  const token = authService.getToken();

  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.put<Coffee>(
    `${API_BASE_URL}/coffee/${id}`,
    coffee,
    config
  );
  return res.data;
};

const remove = async (id: string) => {
  const token = authService.getToken();

  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${API_BASE_URL}/coffee/${id.toString()}`, config);
};

export default { getAll, addNew, remove, update };
