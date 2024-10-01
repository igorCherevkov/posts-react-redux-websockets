import { combineReducers } from "redux";

import { postsReducer } from "./postsReducer";
import { authReducer } from "./authReducer";
import { usersReducer } from "./usersReducer";
import { chatReducer } from "./chatReducer";

export const rootReducer = combineReducers({
  postsReducer,
  authReducer,
  usersReducer,
  chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
