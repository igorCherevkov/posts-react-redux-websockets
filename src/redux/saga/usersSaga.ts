import { call, put, takeLatest } from "redux-saga/effects";

import {
  FETCH_USER,
  fetchUserFailure,
  fetchUserSuccess,
} from "../actions/usersActions";
import { FetchUser, UserProfile } from "../../types/redux/usersTypes";
import { getUserById } from "../../http/users";
import { AxiosError } from "axios";
import { UNKNOWN_ERROR } from "../actions/authActions";

function* fetchUser(action: FetchUser) {
  try {
    const res: { data: UserProfile } = yield call(
      getUserById,
      action.payload.id
    );

    yield put(fetchUserSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(fetchUserFailure(payload));
  }
}

export function* watchUserSaga() {
  yield takeLatest(FETCH_USER, fetchUser);
}
