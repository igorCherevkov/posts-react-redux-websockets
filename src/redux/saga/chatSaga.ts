import { call, put, takeLatest } from "redux-saga/effects";

import { UserProfile } from "../../types/redux/usersTypes";
import { AxiosError } from "axios";
import { UNKNOWN_ERROR } from "../actions/authActions";
import { FetchContact } from "../../types/redux/chatTypes";
import {
  FETCH_CONTACT,
  fetchContactFailure,
  fetchContactSuccess,
} from "../actions/chatActions";
import { getContactUser } from "../../http/chat";

function* fetchContact(action: FetchContact) {
  try {
    const res: { data: UserProfile } = yield call(
      getContactUser,
      action.payload.id
    );

    yield put(fetchContactSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(fetchContactFailure(payload));
  }
}

export function* watchContactSaga() {
  yield takeLatest(FETCH_CONTACT, fetchContact);
}
