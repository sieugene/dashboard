// Core
import { combineReducers } from "redux";

// Reducers
import { EditorReducer as editors } from "./EditorReducer";

export const rootReducer = combineReducers({
  editors,
});
