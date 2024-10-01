import { UserProfile } from "../../types/redux/usersTypes";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUser = (id: string) => ({
  type: FETCH_USER,
  payload: {
    id,
  },
});

export const fetchUserSuccess = (payload: UserProfile) => ({
  type: FETCH_USER_SUCCESS,
  payload,
});

export const fetchUserFailure = (payload: string) => ({
  type: FETCH_USER_FAILURE,
  payload,
});
