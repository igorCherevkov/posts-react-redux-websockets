import { AxiosResponse } from "axios";
import { User } from "../types";
import { $host } from ".";

export const getAllContacts = async (): Promise<AxiosResponse<User[]>> => {
  return await $host.get("/users");
};
