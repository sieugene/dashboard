import { EditorState } from "draft-js";
import { DragnItemsList } from "./../../../Utils/countInArray";
import { HydrateNextActionType } from "./../index";
export const UPDATE_EDITOR = "UPDATE_EDITOR";
export type updateEditorType = {
  type: typeof UPDATE_EDITOR;
  payload: { id: string; data: EditorsValue };
};
export const SET_COLS = "SET_COLS";
export type setColsType = {
  type: typeof SET_COLS;
  payload: DragnItemsList[];
};
export const SET_EDITORS = "SET_EDITORS";
export type setEditorsType = {
  type: typeof SET_EDITORS;
  payload: Editors;
};
export const TOGGLE_LOAD = "TOGGLE_LOAD";
export type toggleLoadType = {
  type: typeof TOGGLE_LOAD;
  payload: boolean;
};
export const TOGGLE_SAVE_PROGRESS = "TOGGLE_SAVE_PROGRESS";
export type toggleSaveProgressType = {
  type: typeof TOGGLE_SAVE_PROGRESS;
  payload: boolean;
};

export const DELETE_ITEM = "DELETE_ITEM";
export type deleteItemType = {
  type: typeof DELETE_ITEM;
  payload: string;
};

export const TOGGLE_OPEN_MODAL = "TOGGLE_OPEN_MODAL";
export type toggleOpenModalType = {
  type: typeof TOGGLE_OPEN_MODAL;
  payload: string | null;
};

export type EditorTypes = "Editor" | "Video" | "Chart";
export type EditorTypeValue = EditorState & { id: string; content: string };
export type ChartData = {
  label: string;
  data: number[][];
}[];
export type EditorsValue = string | ChartData | EditorTypeValue | EditorState;
export type Editors = {
  [key: string]: EditorsValue;
};

export type editorActionsTypes =
  | updateEditorType
  | setColsType
  | setEditorsType
  | toggleLoadType
  | toggleSaveProgressType
  | HydrateNextActionType
  | deleteItemType
  | toggleOpenModalType;
