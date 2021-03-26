import { AnyAction } from "redux";
import { AppState } from "./index";
import { SettingsActionsTypes, UPDATE_TOGGLE } from "./../types/Settings/index";
import { toggleSaveProgress } from "./../actions/Editor/index";
import { service } from "./../../services/index";
import throttle from "lodash.throttle";
import { HYDRATE } from "next-redux-wrapper";
import { ThunkAction } from "redux-thunk";

const initialState = {
  autoSave: true,
  progressBar: true,
  localstorage: false,
};

export type SettingsState = typeof initialState;

export type fieldToggle = "autoSave" | "progressBar" | "localstorage";

export const SettingsReducer = (
  state = initialState,
  action: SettingsActionsTypes
): SettingsState => {
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

type SaveThunk = ThunkAction<void, AppState, unknown, AnyAction>;
export const save = (): SaveThunk => async (dispatch, getState) => {
  try {
    dispatch(toggleSaveProgress(true));
    const state = {
      cols: getState().editors.cols,
      editors: getState().editors.editors,
    };
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
