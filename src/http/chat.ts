import { AxiosResponse } from "axios";
import { Chat, User } from "../types";
import { $host } from ".";

export const getAllContacts = async (): Promise<AxiosResponse<User[]>> => {
  return await $host.get("/users");
};

export const getAllChats = async (
  userId: number
): Promise<AxiosResponse<Chat[]>> => {
  return await $host.get(`/chats/${userId}`);
};

export const getChat = async (
  usersIds: number[],
  isGroup: boolean
): Promise<AxiosResponse<Chat>> => {
  return await $host.post("/chats", {
    usersIds,
    isGroup,
  });
};
