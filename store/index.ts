import { autoRequestSave } from "./middlewares/autoRequestSave";
import { applyMiddleware, compose, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import ReduxThunk from "redux-thunk";
import { rootReducer } from "./reducers";

const DEV = process.env.NODE_ENV === "development";
const isBrowser = process.browser;

// @ts-ignore
const composeEnhancers =
  (DEV &&
    isBrowser &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const middlewares = [ReduxThunk, autoRequestSave];

// create a makeStore function
const makeStore = (context) =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {
  debug: true,
  storeKey: "store",
});
