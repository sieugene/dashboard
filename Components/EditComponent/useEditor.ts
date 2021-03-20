import { getEditor, updateEditor } from "./../../store/reducers/EditorReducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import memoizeOne from "memoize-one";

export const useEditor = (id) => {
  const editor = useSelector(memoizeOne((state) => getEditor(state, id)));

  // Local value for fast update text
  const [localValue, setlocalValue] = useState(editor);
  const dispatch = useDispatch();

  const setEditorState = memoizeOne((content) => {
    setlocalValue(content);
    // in macro task
    setTimeout(() => {
      dispatch(updateEditor(id, content));
    }, 0);

    return content;
  });

  return { editorState: localValue, setEditorState };
};
