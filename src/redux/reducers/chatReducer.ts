import {
  ContactUserActions,
  ContactUserType,
} from "../../types/redux/chatTypes";
import {
  FETCH_CONTACT,
  FETCH_CONTACT_FAILURE,
  FETCH_CONTACT_SUCCESS,
} from "../actions/chatActions";

const chatInitialState: ContactUserType = {
  isLoading: false,
  contactUser: null,
  error: null,
};

export const chatReducer = (
  state: ContactUserType = chatInitialState,
  action: ContactUserActions
) => {
  switch (action.type) {
    case FETCH_CONTACT:
      return { ...state, isLoading: true };
    case FETCH_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contactUser: action.payload,
        error: null,
      };
    case FETCH_CONTACT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
