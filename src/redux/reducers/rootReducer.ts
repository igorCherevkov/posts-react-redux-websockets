import { combineReducers } from "redux";

import { postsReducer } from "./postsReducer";
import { authReducer } from "./authReducer";
import { usersReducer } from "./usersReducer";

export const rootReducer = combineReducers({
  postsReducer,
  authReducer,
  usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
