import { fieldToggle } from "./../../reducers/SettingsReducer";
import { HydrateNextActionType } from "./../index";
export const UPDATE_TOGGLE = "UPDATE_TOGGLE";
export type updateToggleType = {
  type: typeof UPDATE_TOGGLE;
  payload: {
    field: fieldToggle;
    toggle: Boolean;
  };
};
export const FORCE_SAVE = "FORCE_SAVE";
export type forceSaveType = {
  type: typeof FORCE_SAVE;
};
export type SettingsActionsTypes =
  | updateToggleType
  | forceSaveType
  | HydrateNextActionType;
