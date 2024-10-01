import { Post } from "../../types";

export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";
export const ADD_POST = "ADD_POST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const fetchPosts = () => ({
  type: FETCH_POSTS,
});

export const fetchPostsSuccess = (payload: Post[]) => ({
  type: FETCH_POSTS_SUCCESS,
  payload,
});

export const fetchPostsFailure = (payload: string) => ({
  type: FETCH_POSTS_FAILURE,
  payload,
});

export const addPost = (payload: FormData) => ({
  type: ADD_POST,
  payload,
});

export const addPostSuccess = (payload: Post) => ({
  type: ADD_POST_SUCCESS,
  payload,
});

export const addPostFailure = (payload: string) => ({
  type: ADD_POST_FAILURE,
  payload,
});
