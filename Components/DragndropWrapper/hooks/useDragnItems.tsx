import { useSelector } from "react-redux";
import { childIterator } from "../../../Utils/childIterator";
import React, { useEffect, useState } from "react";
import {
  DragnItemsList,
  DragnItemsRawList,
  DragnItemRaw,
  DragnItem,
} from "../../../Utils/countInArray";
import { setCols } from "../../../store/reducers/EditorReducer";
import { useDispatch } from "react-redux";
import memoizeOne from "memoize-one";
import isDeepEqual from "lodash.isequal";
import { ElementCreator } from "./../../ElementCreator/ElementCreator";

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
  if (el.element?.type) {
    const create = ElementCreator(el.element.type, id);
    return {
      ...el,
      content: create
        ? create.content
        : React.createElement(el.element.type, [el.element.props]),
    };
  }
};
