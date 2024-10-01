import { AuthActions, UserState } from "../../types/redux/authTypes";
import { AUTH_FAILURE, AUTH_SUCCESS, LOGOUT } from "../actions/authActions";
import { authInitialState } from "./utils";

export const authReducer = (
  state: UserState = authInitialState,
  action: AuthActions
) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, isAuth: true, user: action.payload, error: null };
    case AUTH_FAILURE:
      return { ...state, error: action.payload };
    case LOGOUT:
      return { ...state, isAuth: false, user: null, error: null };
    default:
      return state;
  }
};
