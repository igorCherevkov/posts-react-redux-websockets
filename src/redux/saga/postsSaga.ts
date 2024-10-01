import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import { createPost, getAllPosts } from "../../http/posts";
import { Post } from "../../types";
import {
  ADD_POST,
  addPostFailure,
  addPostSuccess,
  FETCH_POSTS,
  fetchPostsFailure,
  fetchPostsSuccess,
} from "../actions/postsActions";
import { UNKNOWN_ERROR } from "../actions/authActions";
import { AddPost } from "../../types/redux/postsTypes";

function* fetchPosts() {
  try {
    const res: { data: Post[] } = yield call(getAllPosts);

    yield put(fetchPostsSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(fetchPostsFailure(payload));
  }
}

function* addPostSaga(action: AddPost) {
  try {
    const res: { data: Post } = yield call(createPost, action.payload);

    yield put(addPostSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(addPostFailure(payload));
  }
}

export function* watchFetchPosts() {
  yield all([
    fork(function* () {
      yield takeLatest(FETCH_POSTS, fetchPosts);
    }),
    fork(function* () {
      yield takeLatest(ADD_POST, addPostSaga);
    }),
  ]);
}
