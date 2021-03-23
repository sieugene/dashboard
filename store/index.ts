import { autoSave } from "./reducers/SettingsReducer";
import { applyMiddleware, compose, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import ReduxThunk from "redux-thunk";
import { rootReducer } from "./reducers";

const DEV = process.env.NODE_ENV === "development";
const isBrowser = process.browser;

let intervalId;
const storageSessionMiddleware = (store) => (next) => (action) => {
  if (action.type === "UPDATE_EDITOR") {
    intervalId && clearTimeout(intervalId);
    intervalId = store.dispatch(autoSave());
  }
  next(action);
  // setTimeout(() => {
  //   sessionStorage.setItem("root::storage", JSON.stringify(store.getState()));
  // }, 0);
};

// Instruments
// @ts-ignore
const composeEnhancers =
  (DEV && isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middlewares = [ReduxThunk, storageSessionMiddleware];

// create a makeStore function
const makeStore = (context) =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {
  debug: true,
  storeKey: "store",
});
