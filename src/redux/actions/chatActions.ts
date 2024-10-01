import { UserProfile } from "../../types/redux/usersTypes";

export const FETCH_CONTACT = "FETCH_CONTACT";
export const FETCH_CONTACT_SUCCESS = "FETCH_CONTACT_SUCCESS";
export const FETCH_CONTACT_FAILURE = "FETCH_CONTACT_FAILURE";

export const fetchContact = (id: string) => ({
  type: FETCH_CONTACT,
  payload: {
    id,
  },
});

export const fetchContactSuccess = (payload: UserProfile) => ({
  type: FETCH_CONTACT_SUCCESS,
  payload,
});

export const fetchContactFailure = (payload: string) => ({
  type: FETCH_CONTACT_FAILURE,
  payload,
});
