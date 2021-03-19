import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { HYDRATE } from "next-redux-wrapper";

// Constants

const initialState = {
  editors: {
    test: EditorState.createEmpty(),
  },
};

const saveContentToStore = (content) => {
  const JSContent = {
    ...content,
    content: JSON.stringify(convertToRaw(content.getCurrentContent())),
  };
  localStorage.setItem("testData", JSON.stringify(JSContent));
  return JSContent;
};

export const readContentFromStore = (content) => {
  const DBEditorState = convertFromRaw(JSON.parse(content.content));
  const JsData = {
    ...content,
    content: EditorState.createWithContent(DBEditorState),
  };
  return JsData;
};

export const updateEditor = (id: string, value) => (dispatch) => {
  saveContentToStore(value);
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
