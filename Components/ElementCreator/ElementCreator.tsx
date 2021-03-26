import React from "react";
import { generateItems } from "../../Utils/countInArray";
import { EditChart } from "../EditComponent/EditChart/EditChart";
import { EditImageUpload } from "../EditComponent/EditImageUpload/EditImageUpload";
import { EditText } from "../EditComponent/EditText/EditText";
import { EditVideo } from "../EditComponent/EditVideo/EditVideo";

export const ElementCreator = (type: string, id: string) => {
  switch (type) {
    case "TEXT__ELEMENT":
    case "EditText":
      return {
        content: <EditText id={id} />,
        id,
      };
    case "EDITOR_IMAGE":
    case "EditImageUpload":
      return {
        content: <EditImageUpload id={id} />,
        id,
      };
    case "EDITOR_IMAGE":
    case "EditImageUpload":
      return {
        content: <EditImageUpload id={id} />,
        id,
      };
    case "ADD_LAYOUT":
      return {
        extend: generateItems(1),
      };
    case "VIDEO":
    case "EditVideo":
      return {
        content: <EditVideo id={id} />,
        id,
      };
    case "CHART":
    case "EditChart":
      return {
        content: <EditChart id={id} />,
        id,
      };
    default:
      return undefined;
  }
};
