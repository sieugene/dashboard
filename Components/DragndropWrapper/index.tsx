import React, { FC, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { childIterator } from "../../Utils/childIterator";
import { DragnItemsList, generateItems } from "../../Utils/countInArray";
import { DroppableElement } from "../DroppableElement/DroppableElement";
import { Panel } from "../Panel/Panel";
import s from "./index.module.scss";
import { EditImageUpload } from "../EditComponent/EditImageUpload";
import { EditText } from "../EditComponent/EditText";
import { onDragEndHandler } from "./DragndropWrapper.functions";
type Props = {
  children: JSX.Element[];
};

export const DragndropMultiple: FC<Props> = React.memo(({ children }) => {
  const [state, setState] = useState<DragnItemsList[]>(childIterator(children));

  function onDragEnd(result: DropResult) {
    onDragEndHandler(result, state, setState, createMoveElement);
  }

  const createMoveElement = (type: string, id: string) => {
    const elements = {
      TEXT__ELEMENT: {
        content: <EditText id={id} />,
        id,
      },
      EDITOR_IMAGE: {
        content: <EditImageUpload id={id} />,
        id,
      },
    };
    const create = elements[type];
    return generateItems(1, 0, create.content);
  };

  const deleteItem = (ind: number, index: number) => {
    const newState = [...state];
    newState[ind].splice(index, 1);
    setState(newState.filter((group) => group.length));
  };

  return (
    <div>
      {/* <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, generateItems(1)]);
        }}
      >
        Add new item
      </button> */}
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
    </div>
  );
});
