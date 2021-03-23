import React, { FC, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { childIterator } from "../../Utils/childIterator";
import { DragnItemsList } from "../../Utils/countInArray";
import { DroppableElement } from "../DroppableElement/DroppableElement";
import { Panel } from "../Panel/Panel";
import s from "./index.module.scss";
import { onDragEndHandler } from "./DragndropWrapper.functions";
import { useCreateMoveElement } from "../../hooks/useCreateMoveElement";
import { saveCols } from "../../store/reducers/EditorReducer";
import { useDispatch } from "react-redux";
type Props = {
  children: JSX.Element[];
};

export const DragndropMultiple: FC<Props> = React.memo(({ children }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState<DragnItemsList[]>(childIterator(children));
  const createMoveElement = useCreateMoveElement(setState, state);

  useEffect(() => {
    dispatch(saveCols(state));
  }, [state]);

  function onDragEnd(result: DropResult) {
    onDragEndHandler(result, state, setState, createMoveElement);
  }

  const deleteItem = (ind: number, index: number) => {
    const newState = [...state];
    newState[ind].splice(index, 1);
    setState(newState.filter((group) => group.length));
  };

  return (
    <div className={s.drag__wrap}>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.map((el, ind) => (
          <DroppableElement
            ind={ind}
            el={el}
            key={ind}
            deleteItem={deleteItem}
          />
        ))}
        <Panel />
      </DragDropContext>
    </div>
  );
});
