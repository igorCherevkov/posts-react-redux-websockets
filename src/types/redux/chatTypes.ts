import {
  FETCH_CONTACT,
  FETCH_CONTACT_FAILURE,
  FETCH_CONTACT_SUCCESS,
} from "../../redux/actions/chatActions";
import { UserProfile } from "./usersTypes";

export type ContactUserType = {
  isLoading: boolean;
  contactUser: UserProfile | null;
  error: string | null;
};

export type FetchContact = {
  type: typeof FETCH_CONTACT;
  payload: {
    id: number;
  };
};

export type FetchContactSuccess = {
  type: typeof FETCH_CONTACT_SUCCESS;
  payload: UserProfile;
};

export type FetchContactFailure = {
  type: typeof FETCH_CONTACT_FAILURE;
  payload: string;
};

export type ContactUserActions =
  | FetchContact
  | FetchContactSuccess
  | FetchContactFailure;
