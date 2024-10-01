import { AxiosResponse } from "axios";

import { Post } from "../types";
import { $host } from "./index";

export const getAllPosts = async (): Promise<AxiosResponse<Post[]>> => {
  return await $host.get("/posts");
};

export const createPost = async (
  formData: FormData
): Promise<AxiosResponse<Post>> => {
  return await $host.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
