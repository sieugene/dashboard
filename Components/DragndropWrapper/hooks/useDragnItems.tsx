import { useSelector } from "react-redux";
import { childIterator } from "../../../Utils/childIterator";
import React, { useEffect, useState } from "react";
import {
  DragnItemsList,
  DragnItemsRawList,
  DragnItemRaw,
  DragnItem,
  generateItems,
} from "../../../Utils/countInArray";
import { EditText } from "../../EditComponent/EditText";
import { EditImageUpload } from "../../EditComponent/EditImageUpload";
import { EditVideo } from "../../EditComponent/EditVideo/EditVideo";
import { EditChart } from "../../EditComponent/EditChart/EditChart";
import { setCols } from "../../../store/reducers/EditorReducer";
import { useDispatch } from "react-redux";
import memoizeOne from "memoize-one";
import isDeepEqual from "lodash.isequal";

export const useDragnItems = (children: JSX.Element[]) => {
  const dispatch = useDispatch();
  const colsRaw = useSelector((state) => state.editors.cols);
  const dragnItems = createDragnItems(colsRaw);
  const [state, setState] = useState<DragnItemsList[]>(
    dragnItems || childIterator(children)
  );

  const updateCols = (state: DragnItemsList[]) => {
    dispatch(setCols(state));
    return state;
  };
  const deepUpdateCols = memoizeOne(updateCols, isDeepEqual);
  useEffect(() => {
    deepUpdateCols(state);
  }, [state]);

  return { state, setState };
};

const createDragnItems = (colsRaw: DragnItemsRawList[]): DragnItemsList[] => {
  if (colsRaw?.length && Array.isArray(colsRaw)) {
    const dragnItems = colsRaw.reduce((items: DragnItemsList[], cols) => {
      const layout = cols?.reduce((colElements: DragnItem[], el) => {
        const created = createElement(el);
        created && colElements.push(created);
        return colElements;
      }, []);
      if (layout && Array.isArray(layout)) {
        items.push(layout);
      }
      return items;
    }, []);
    return dragnItems;
  }
};
const createElement = (el: DragnItemRaw): DragnItem => {
  const id = el.id ?? "";
  const elements = {
    EditText: {
      content: <EditText id={id} />,
    },
    EditImageUpload: {
      content: <EditImageUpload id={id} />,
    },
    ADD_LAYOUT: {
      extend: generateItems(1),
    },
    EditVideo: {
      content: <EditVideo id={id} />,
    },
    EditChart: {
      content: <EditChart id={id} />,
    },
  };
  if (el.element?.type) {
    const condition = elements[el.element.type];
    return {
      ...el,
      content: condition
        ? elements[el.element.type].content
        : React.createElement(el.element.type, [el.element.props]),
    };
  }
};
