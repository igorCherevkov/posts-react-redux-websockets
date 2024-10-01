import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import {
  AUTH,
  authFailure,
  authSuccess,
  CHECK_AUTH,
  UNKNOWN_ERROR,
} from "../actions/authActions";
import { fetchCheckAuth, fetchLogin, fetchRegistration } from "../../http/auth";
import { Auth, dataWithToken } from "../../types/redux/authTypes";

function* authSaga(action: Auth) {
  let res: { data: dataWithToken };

  try {
    const { email, login, password, isRegistration } = action.payload;

    res = yield call(
      isRegistration ? fetchRegistration : fetchLogin,
      email,
      login,
      password
    );

    localStorage.setItem("token", res.data.token);
    yield put(authSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(authFailure(payload));
  }
}

function* checkAuthSaga() {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      const res: { data: dataWithToken } = yield call(fetchCheckAuth);

      yield put(authSuccess(res.data));
    }
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(authFailure(payload));
  }
}

export function* watchAuthSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(AUTH, authSaga);
    }),
    fork(function* () {
      yield takeLatest(CHECK_AUTH, checkAuthSaga);
    }),
  ]);
}
