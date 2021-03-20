import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { HYDRATE } from "next-redux-wrapper";

// Constants

const initialState = {
  editors: {},
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
          [action.payload.id]: action.payload.data,
        },
      };
    default:
      return state;
  }
};

// Helpers
const saveContentToStore = (id: string, content) => {
  const JSContent = {
    ...content,
    id,
    content: JSON.stringify(convertToRaw(content.getCurrentContent())),
  };
  return JSContent;
};

export const readContentFromStore = (editor) => {
  if (editor?.content) {
    const DBEditorState = convertFromRaw(JSON.parse(editor.content));
    const JsData = {
      ...editor,
      content: EditorState.createWithContent(DBEditorState),
    };
    return JsData.content;
  } else {
    return EditorState.createEmpty();
  }
};
// Thunks
export const updateEditor = (id: string, value) => (dispatch) => {
  dispatch({
    type: UPDATE_EDITOR,
    payload: { id, data: saveContentToStore(id, value) },
  });
};
// Selector
export const getEditor = (state, id) =>
  readContentFromStore(state.editors.editors[id]);
