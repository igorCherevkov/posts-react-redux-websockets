import { Post } from "../";
import {
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
} from "../../redux/actions/usersActions";

export type FetchUserSuccess = {
  type: typeof FETCH_USER_SUCCESS;
  payload: UserProfile;
};

export type FetchUserFailure = {
  type: typeof FETCH_USER_FAILURE;
  payload: string;
};

export type UserProfileActions =
  | FetchUserSuccess
  | FetchUserFailure
  | FetchUser;

export type UserProfileType = {
  isLoading: boolean;
  userProfile: UserProfile | null;
  error: string | null;
};

export type UserProfile = {
  id: number;
  email: string;
  login: string;
  userImg: string;
  posts: Post[];
};

export type FetchUser = {
  type: typeof FETCH_USER;
  payload: {
    id: number;
  };
};

export type UserForRender = {
  id: number;
  email: string;
  login: string;
  userImg: string | null;
  posts: Post[];
};
