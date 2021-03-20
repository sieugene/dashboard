import { EditorState } from "draft-js";
import {
  readContentFromStore,
  updateEditor,
} from "./../../store/reducers/EditorReducer";
import { useSelector, useDispatch } from "react-redux";

export const useEditor = (id) => {
  const state = useSelector((state) => state.editors);
  const dispatch = useDispatch();
  const parsed = JSON.parse(localStorage.getItem("testData"));
  const data = readContentFromStore(parsed);
  const editorState = data
    ? data.content
    : state.editors[id] ?? EditorState.createEmpty();

  const setEditorState = (content) => {
    dispatch(updateEditor(id, content));
  };

  return { editorState, setEditorState };
};
