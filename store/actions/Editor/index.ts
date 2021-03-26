import {
  editorActionsTypes,
  Editors,
  SET_EDITORS,
  TOGGLE_LOAD,
  TOGGLE_SAVE_PROGRESS,
} from "./../../types/Editor/index";

export const setEditors = (editors: Editors): editorActionsTypes => {
  return {
    type: SET_EDITORS,
    payload: editors,
  };
};

export const toggleLoad = (load: boolean): editorActionsTypes => {
  return {
    type: TOGGLE_LOAD,
    payload: load,
  };
};

export const toggleSaveProgress = (load: boolean): editorActionsTypes => {
  return {
    type: TOGGLE_SAVE_PROGRESS,
    payload: load,
  };
};
