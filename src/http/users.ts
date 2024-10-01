import { AxiosResponse } from "axios";
import { User } from "../types";
import { $host } from ".";

export const getUserById = async (id: number): Promise<AxiosResponse<User>> => {
  return await $host.get(`/users/${id}`);
};
