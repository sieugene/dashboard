import { toggleSaveProgress } from "./EditorReducer";
import { service } from "./../../services/index";
import throttle from "lodash.throttle";
import { HYDRATE } from "next-redux-wrapper";

export const UPDATE_TOGGLE = "UPDATE_TOGGLE";
export const FORCE_SAVE = "FORCE_SAVE";

const initialState = {
  autoSave: true,
  progressBar: true,
  localstorage: false,
};

export type fieldToggle = "autoSave" | "progressBar" | "localstorage";

export const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case UPDATE_TOGGLE:
      return {
        ...state,
        [action.payload.field]: action.payload.toggle,
      };
    default:
      return state;
  }
};

export const forceSaveAction = () => {
  return {
    type: FORCE_SAVE,
  };
};

export const updateToggle = (field: fieldToggle, toggle: Boolean) => {
  return {
    type: UPDATE_TOGGLE,
    payload: { field, toggle },
  };
};

export const save = () => async (dispatch, getState) => {
  try {
    dispatch(toggleSaveProgress(true));
    const state = getState().editors;
    await service.editorsUpdate(state);
  } catch (error) {
  } finally {
    dispatch(toggleSaveProgress(false));
  }
};

export const autoSave = () => (dispatch, getState) => {
  const THROTTLE_TIMEOUT = 5000; // <= adjust this number to see throttling in action
  const INVOCATION_TIMEOUT = 5000;
  const doSave = async () => {
    const autoSave = getState().settings.autoSave;
    if (autoSave) {
      await dispatch(save());
    }
  };

  const throttledPunchClock = throttle(doSave, THROTTLE_TIMEOUT);

  const intervalId = setTimeout(throttledPunchClock, INVOCATION_TIMEOUT);

  return intervalId;
};
