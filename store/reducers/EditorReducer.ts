import { EditorsValue, EditorTypeValue } from "./../types/Editor/index";
import { AppState } from "./index";
import { DragnItemsList } from "./../../Utils/countInArray";
// Actions
import { toggleLoad, setEditors } from "../actions/Editor/index";
// Types
import {
  UPDATE_EDITOR,
  SET_EDITORS,
  SET_COLS,
  TOGGLE_LOAD,
  TOGGLE_SAVE_PROGRESS,
  editorActionsTypes,
  ChartData,
  EditorTypes,
  Editors,
} from "../types/Editor";
import { AxiosResponse } from "axios";
import { service } from "./../../services/index";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { HYDRATE } from "next-redux-wrapper";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export type EditorsState = {
  editors: Editors | {};
  cols: null | DragnItemsList[];
  load: boolean;
  saveProgress: boolean;
};

const initialState: EditorsState = {
  editors: {},
  cols: null,
  load: true,
  saveProgress: false,
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

export const EditorReducer = (
  state = initialState,
  action: editorActionsTypes
): EditorsState => {
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
    case TOGGLE_LOAD:
      return {
        ...state,
        load: action.payload,
      };
    case TOGGLE_SAVE_PROGRESS:
      return {
        ...state,
        saveProgress: action.payload,
      };

    default:
      return state;
  }
};

// Helpers
const saveContentToStore = (id: string, content: EditorState) => {
  const JSContent = {
    ...content,
    id,
    content: JSON.stringify(convertToRaw(content.getCurrentContent())),
  };
  return JSContent;
};

export const readContentFromStore = (editor: EditorTypeValue) => {
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
export const updateEditor = (
  id: string,
  value: EditorsValue,
  type: EditorTypes
) => (dispatch) => {
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
type SetColsThunk = ThunkAction<void, AppState, unknown, AnyAction>;
export const setCols = (state: DragnItemsList[]): SetColsThunk => (
  dispatch
) => {
  const cols =
    state &&
    Array.from(state).reduce(
      (formattedCols: DragnItemsList[], col: DragnItemsList) => {
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
      },
      []
    );

  dispatch({
    type: SET_COLS,
    payload: cols,
  });
};
export const fetchData = () => async (dispatch) => {
  try {
    dispatch(toggleLoad(true));
    const { data }: AxiosResponse<any> = await service.allEditors();
    dispatch(setCols(data.cols));
    dispatch(setEditors(data.editors));
  } catch (error) {
  } finally {
    dispatch(toggleLoad(false));
  }
};
// Selector
export const getEditor = (
  state: AppState,
  id: string,
  type: EditorTypes
): EditorsValue => {
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
