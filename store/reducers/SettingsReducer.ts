import { toggleSaveProgress } from "./EditorReducer";
import { service } from "./../../services/index";
import throttle from "lodash.throttle";
import { HYDRATE } from "next-redux-wrapper";

export const UPDATE_TOGGLE = "UPDATE_TOGGLE";

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

export const updateToggle = (field: fieldToggle, toggle: Boolean) => {
  return {
    type: UPDATE_TOGGLE,
    payload: { field, toggle },
  };
};

export const autoSave = () => (dispatch, getState) => {
  const THROTTLE_INTERVAL = 5000; // <= adjust this number to see throttling in action
  const INVOCATION_INTERVAL = 5000; // 0.1 sec

  // regular fn
  const punchClock = async () => {
    try {
      dispatch(toggleSaveProgress(true));
      const state = getState().editors;
      await service.editorsUpdate(state);
    } catch (error) {
    } finally {
      dispatch(toggleSaveProgress(false));
    }
  };

  // wrap it and supply interval representing minimum delay between invocations
  const throttledPunchClock = throttle(punchClock, THROTTLE_INTERVAL);

  // set up looping
  const intervalId = setTimeout(throttledPunchClock, INVOCATION_INTERVAL);

  return intervalId;
};
