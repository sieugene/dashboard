import { autoSave, save } from "./../reducers/SettingsReducer";

let intervalId;
export const autoRequestSave = (store) => (next) => (action) => {
  if (action.type === "UPDATE_EDITOR" || action.type === "SET_COLS") {
    intervalId && clearTimeout(intervalId);
    intervalId = store.dispatch(autoSave());
  }
  if (action.type === "FORCE_SAVE") {
    intervalId && clearTimeout(intervalId);
    setTimeout(() => {
      store.dispatch(save());
    }, 0);
  }
  next(action);
};
