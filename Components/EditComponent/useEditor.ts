import { EditorState } from "draft-js";
import { updateEditor } from "./../../store/reducers/EditorReducer";
import { useSelector, useDispatch } from "react-redux";

export const useEditor = (id) => {
  const state = useSelector((state) => state.editors);
  const dispatch = useDispatch();
  const editorState = state.editors[id] ?? EditorState.createEmpty();

  const setEditorState = (content) => {
    dispatch(updateEditor(id, content));
  };

  return { editorState, setEditorState };
};
