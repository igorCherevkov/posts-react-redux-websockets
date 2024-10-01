import { PostsActions, PostsState } from "../../types/redux/postsTypes";
import {
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
} from "../actions/postsActions";
import { postsInitialState } from "./utils";

export const postsReducer = (
  state: PostsState = postsInitialState,
  action: PostsActions
) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, isLoading: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, isLoading: false, posts: action.payload, error: null };
    case FETCH_POSTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case ADD_POST_SUCCESS:
      return { ...state, posts: [...state.posts, action.payload] };
    case ADD_POST_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
