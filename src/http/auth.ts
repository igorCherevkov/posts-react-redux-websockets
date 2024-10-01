import { AxiosResponse } from "axios";

import { $host } from "./";
import { dataWithToken } from "../types/redux/authTypes";

export const fetchRegistration = async (
  email: string,
  login: string,
  password: string
): Promise<AxiosResponse<dataWithToken>> => {
  return await $host.post("/auth/registration", {
    email,
    login,
    password,
  });
};

export const fetchLogin = async (
  email: string,
  login: string,
  password: string
): Promise<AxiosResponse<dataWithToken>> => {
  return await $host.post("/auth/login", {
    email,
    login,
    password,
  });
};

export const fetchCheckAuth = async (): Promise<
  AxiosResponse<dataWithToken>
> => {
  return await $host.get("/auth/profile");
};
