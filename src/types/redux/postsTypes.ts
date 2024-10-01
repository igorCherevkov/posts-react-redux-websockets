import { Post } from "../";
import {
  ADD_POST,
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
} from "../../redux/actions/postsActions";

export type PostsState = {
  isLoading: boolean;
  posts: Post[];
  error: string | null;
};

export type FetchPosts = {
  type: typeof FETCH_POSTS;
};

export type FetchPostsSuccess = {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: Post[];
};

export type FetchPostsFailure = {
  type: typeof FETCH_POSTS_FAILURE;
  payload: string;
};

export type AddPost = {
  type: typeof ADD_POST;
  payload: FormData;
};

export type AddPostFailure = {
  type: typeof ADD_POST_FAILURE;
  payload: string;
};

export type PostsActions =
  | FetchPostsSuccess
  | FetchPostsFailure
  | FetchPosts
  | AddPost
  | AddPostSuccess
  | AddPostFailure;

export type AddPostSuccess = {
  type: typeof ADD_POST_SUCCESS;
  payload: Post;
};
