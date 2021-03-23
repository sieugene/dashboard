// Core
import { combineReducers } from "redux";

// Reducers
import { EditorReducer as editors } from "./EditorReducer";
import { SettingsReducer as settings } from "./SettingsReducer";

export const rootReducer = combineReducers({
  editors,
  settings,
});
