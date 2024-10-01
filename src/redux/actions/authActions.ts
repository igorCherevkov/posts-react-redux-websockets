import { Auth, dataWithToken } from "../../types/redux/authTypes";

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGOUT = "LOGOUT";
export const AUTH = "AUTH";
export const CHECK_AUTH = "CHECK_AUTH";
export const UNKNOWN_ERROR = "Unknown error";

export const auth = (
  email: string,
  login: string,
  password: string,
  isRegistration: boolean
): Auth => ({
  type: AUTH,
  payload: {
    email,
    login,
    password,
    isRegistration,
  },
});

export const authSuccess = (payload: dataWithToken) => ({
  type: AUTH_SUCCESS,
  payload,
});

export const authFailure = (payload: string) => ({
  type: AUTH_FAILURE,
  payload,
});

export const checkAuth = () => ({
  type: CHECK_AUTH,
});

export const logout = () => ({
  type: LOGOUT,
});
