import {
  UserProfileType,
  UserProfileActions,
} from "../../types/redux/usersTypes";
import {
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
} from "../actions/usersActions";
import { userInitialState } from "./utils";

export const usersReducer = (
  state: UserProfileType = userInitialState,
  action: UserProfileActions
) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, isLoading: true };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        anotherUser: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
