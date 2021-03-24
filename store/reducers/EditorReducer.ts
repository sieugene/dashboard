import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { HYDRATE } from "next-redux-wrapper";

// Constants
export const UPDATE_EDITOR = "UPDATE_EDITOR";
export const SET_COLS = "SET_COLS";
export const SET_EDITORS = "SET_EDITORS";

const initialState = {
  editors: {},
  cols: null,
};

const staticData: ChartData = [
  {
    label: "Series 1",
    data: [
      [0, 1],
      [1, 2],
      [2, 4],
      [3, 2],
      [4, 7],
    ],
  },
  {
    label: "Series 2",
    data: [
      [0, 3],
      [1, 1],
      [2, 5],
      [3, 6],
      [4, 4],
    ],
  },
];

// Types
export type EditorTypes = "Editor" | "Video" | "Chart";
export type ChartData = {
  label: string;
  data: number[][];
}[];

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
    case SET_EDITORS:
      return {
        ...state,
        editors: action.payload,
      };
    case SET_COLS:
      return {
        ...state,
        cols: action.payload,
      };
    default:
      return state;
  }
};

export const setEditors = (editors) => {
  return {
    type: SET_EDITORS,
    payload: editors,
  };
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
export const updateEditor = (id: string, value, type: EditorTypes) => (
  dispatch
) => {
  switch (type) {
    case "Editor":
      dispatch({
        type: UPDATE_EDITOR,
        payload: { id, data: saveContentToStore(id, value) },
      });
      break;
    case "Video":
    case "Chart":
      dispatch({
        type: UPDATE_EDITOR,
        payload: { id, data: value },
      });
    default:
      break;
  }
};
// Сохраняем элементы колонок и положения, для последующего сохранения и переобразования
export const setCols = (state) => (dispatch) => {
  const cols =
    state &&
    Array.from(state).reduce((formattedCols: any, col: any) => {
      const colElementsTotal = col?.reduce((colElements, el) => {
        colElements.push({
          element: el.element,
          id: el.id,
        });
        return colElements;
      }, []);
      if (colElementsTotal && Array.isArray(colElementsTotal)) {
        formattedCols.push(colElementsTotal);
      }
      return formattedCols;
    }, []);
  dispatch({
    type: SET_COLS,
    payload: cols,
  });
};
// Selector
export const getEditor = (state, id: string, type: EditorTypes) => {
  if (state.editors?.editors) {
    switch (type) {
      case "Editor":
        return readContentFromStore(state.editors.editors[id]);
      case "Video":
        return state.editors.editors[id] ?? "";
      case "Chart":
        return state.editors.editors[id] ?? staticData;
      default:
        return "";
    }
  }
};
