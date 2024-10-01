import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "./store";
import { RootState } from "./reducers/rootReducer";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
