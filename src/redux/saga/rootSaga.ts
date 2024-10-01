import { all } from "redux-saga/effects";

import { watchAuthSaga } from "./authSaga";
import { watchFetchPosts } from "./postsSaga";
import { watchUserSaga } from "./usersSaga";

export function* rootSaga() {
  yield all([
    watchAuthSaga(),
    watchFetchPosts(),
    watchUserSaga(),
  ]);
}
