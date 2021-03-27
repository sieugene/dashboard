import { fieldToggle } from "./../../reducers/SettingsReducer";
import {
  FORCE_SAVE,
  SettingsActionsTypes,
  UPDATE_TOGGLE,
} from "./../../types/Settings/index";
export const forceSaveAction = (): SettingsActionsTypes => {
  return {
    type: FORCE_SAVE,
  };
};

export const updateToggle = (
  field: fieldToggle,
  toggle: Boolean
): SettingsActionsTypes => {
  return {
    type: UPDATE_TOGGLE,
    payload: { field, toggle },
  };
};
