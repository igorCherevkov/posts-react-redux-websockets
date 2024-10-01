import { AxiosResponse } from "axios";
import { User } from "../types";
import { $host } from ".";

export const getContactUser = async (
  id: number
): Promise<AxiosResponse<User>> => {
  return await $host.get(`/users/${id}`);
};
