import {
  AUTH,
  AUTH_FAILURE,
  AUTH_SUCCESS,
  LOGOUT,
} from "../../redux/actions/authActions";

export type dataWithToken = {
  id: number;
  email: string;
  login: string;
  userImg: string | null;
  token: string;
};

export type AuthProps = {
  title: string;
  button: string;
  link: string;
  linkText: string;
  spanText: string;
};

export type UserState = {
  isAuth: boolean;
  user: UserStore | null;
  error: string | null;
};

export type UserStore = {
  id: number;
  email: string;
  login: string;
  userImg: string | null;
};

export type AuthSuccess = {
  type: typeof AUTH_SUCCESS;
  payload: UserStore;
};

export type AuthFailure = {
  type: typeof AUTH_FAILURE;
  payload: string;
};

export type Logout = {
  type: typeof LOGOUT;
};

export type AuthActions = AuthSuccess | AuthFailure | Logout;

export type Auth = {
  type: typeof AUTH;
  payload: {
    email: string;
    login: string;
    password: string;
    isRegistration: boolean;
  };
};
