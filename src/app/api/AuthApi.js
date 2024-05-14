import axios from "axios";
import { BASE_URL } from "../constants";

export const loginUser = async (params) => {
  try {
    const data = await axios.post(`${BASE_URL}/login`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
