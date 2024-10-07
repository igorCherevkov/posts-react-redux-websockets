import { AxiosResponse } from "axios";
import { Chat, User } from "../types";
import { $host } from ".";

export const getAllContacts = async (
  userId: number
): Promise<AxiosResponse<User[]>> => {
  return await $host.get(`/users/chat/${userId}`);
};

export const getAllChats = async (
  userId: number
): Promise<AxiosResponse<Chat[]>> => {
  return await $host.get(`/chats/${userId}`);
};

export const getChatMessages = async (chatId: number) => {
  return await $host.get(`/chats/messages/${chatId}`);
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
