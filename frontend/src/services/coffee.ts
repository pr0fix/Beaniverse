import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const getAll = async () => {
  const res = await axios.get(`${API_BASE_URL}/coffee`);
  console.log(res.data)
  return res.data;
};

export default { getAll };
