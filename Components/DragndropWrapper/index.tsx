import React, { FC, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { childIterator } from "../../Utils/childIterator";
import { DragnItemsList, generateItems } from "../../Utils/countInArray";
import { moveItems } from "../../Utils/moveItems";
import { reorder } from "../../Utils/reorder";
import { DroppableElement } from "../DroppableElement/DroppableElement";
import { Panel } from "../Panel/Panel";
import { v4 as uuidv4 } from "uuid";
import s from "./index.module.scss";
import { EditImageUpload } from "../EditComponent/EditImageUpload";
import { EditText } from "../EditComponent/EditText";
type Props = {
  children: JSX.Element[];
};

export const DragndropMultiple: FC<Props> = React.memo(({ children }) => {
  const [state, setState] = useState<DragnItemsList[]>(childIterator(children));

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    const isNotChangeCol = sInd === dInd;

    const sourceElement = state[sInd]
      ? state[sInd]
      : createMoveElement(draggableId, uuidv4());

    if (!sourceElement || !state[dInd]) {
      return null;
    }

    if (isNotChangeCol) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = moveItems(sourceElement, state[dInd], source, destination);
      const newState = [...state];
      // If create new move element, get by type in result
      if (!sInd && sInd !== 0) {
        newState[dInd] = [...newState[dInd], ...result[source.droppableId]];
      } else {
        newState[sInd] = result[sInd];
        newState[dInd] = result[dInd];
      }
      setState(newState.filter((group) => group.length));
    }
  }

  const createMoveElement = (type: string, id) => {
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
