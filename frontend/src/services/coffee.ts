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

export default { getAll, addNew };
