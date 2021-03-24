import React, { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { DroppableElement } from "../DroppableElement/DroppableElement";
import { Panel } from "../Panel/Panel";
import s from "./index.module.scss";
import { onDragEndHandler } from "./DragndropWrapper.functions";
import { useCreateMoveElement } from "../../hooks/useCreateMoveElement";
import { useDragnItems } from "./hooks/useDragnItems";
type Props = {
  children: JSX.Element[];
};

export const DragndropMultiple: FC<Props> = React.memo(({ children }) => {
  const { state, setState } = useDragnItems(children);
  const createMoveElement = useCreateMoveElement(setState, state);

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
