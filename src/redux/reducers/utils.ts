import { UserState } from "../../types/redux/authTypes";
import { PostsState } from "../../types/redux/postsTypes";
import { UserProfileType } from "../../types/redux/usersTypes";

export const postsInitialState: PostsState = {
  isLoading: false,
  posts: [],
  error: null,
};

export const authInitialState: UserState = {
  isAuth: false,
  user: null,
  error: null,
};

export const userInitialState: UserProfileType = {
  isLoading: false,
  anotherUser: null,
  error: null,
};
