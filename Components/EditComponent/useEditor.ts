import { toggleOpenModal } from "./../../store/actions/Editor/index";
import { EditorsValue } from "./../../store/types/Editor/index";
import { AppState } from "./../../store/reducers/index";
import {
  getEditor,
  modalVisible,
  updateEditor,
} from "./../../store/reducers/EditorReducer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import memoizeOne from "memoize-one";
import { EditorTypes } from "../../store/types/Editor";

export const useEditor = (id: string, type: EditorTypes = "Editor") => {
  const editor: EditorsValue = useSelector<AppState, EditorsValue>(
    memoizeOne((state: AppState) => getEditor(state, id, type))
  );
  const isModalVisible: boolean = useSelector<AppState, boolean>(
    (state: AppState) => modalVisible(state, id)
  );
  const setIsModalVisible = (toggle: boolean) => {
    dispatch(toggleOpenModal(toggle ? id : null));
  };

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

  return {
    editorState: localValue,
    setEditorState,
    isModalVisible,
    setIsModalVisible,
  };
};
