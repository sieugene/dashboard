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
        content: <EditText id={id} type={"EditText"} />,
        id,
      };
    case "EDITOR_IMAGE":
    case "EditImageUpload":
      return {
        content: <EditImageUpload id={id} type={"EditImageUpload"} />,
        id,
      };
    case "EDITOR_IMAGE":
    case "EditImageUpload":
      return {
        content: <EditImageUpload id={id} type={"EditImageUpload"} />,
        id,
      };
    case "ADD_LAYOUT":
      return {
        extend: generateItems(1),
      };
    case "VIDEO":
    case "EditVideo":
      return {
        content: <EditVideo id={id} type={"EditVideo"} />,
        id,
      };
    case "CHART":
    case "EditChart":
      return {
        content: <EditChart id={id} type={"EditChart"} />,
        id,
      };
    default:
      return undefined;
  }
};
