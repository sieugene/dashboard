import { EditorsValue } from "./../../store/types/Editor/index";
import { AppState } from "./../../store/reducers/index";
import { getEditor, updateEditor } from "./../../store/reducers/EditorReducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import memoizeOne from "memoize-one";
import { EditorTypes } from "../../store/types/Editor";

export const useEditor = (id: string, type: EditorTypes = "Editor") => {
  const editor = useSelector<AppState, EditorsValue>(
    memoizeOne((state) => getEditor(state, id, type))
  );

  // Local value for fast update text
  const [localValue, setlocalValue] = useState<EditorsValue>(editor);
  const dispatch = useDispatch();

  const setEditorState = memoizeOne((content: EditorsValue) => {
    setlocalValue(content);
    // in macro task
    setTimeout(() => {
      dispatch(updateEditor(id, content, type));
    }, 0);

    return content;
  });

  return { editorState: localValue, setEditorState };
};
