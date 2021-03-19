import { EditorState } from "draft-js";
import { HYDRATE } from "next-redux-wrapper";

// Constants

const initialState = {
  editors: {
    test: EditorState.createEmpty(),
  },
};

export const updateEditor = (id: string, value) => (dispatch) => {
  dispatch({
    type: UPDATE_EDITOR,
    payload: { id, value },
  });
};

export const UPDATE_EDITOR = "UPDATE_EDITOR";

export const EditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case UPDATE_EDITOR:
      return {
        ...state,
        editors: {
          ...state.editors,
          [action.payload.id]: action.payload.value,
        },
      };
    default:
      return state;
  }
};
