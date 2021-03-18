import React, { FC, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { childIterator } from "../../Utils/childIterator";
import { generateItems, DragnItemsList } from "../../Utils/countInArray";
import { moveItems } from "../../Utils/moveItems";
import { reorder } from "../../Utils/reorder";
import { DroppableElement } from "../DroppableElement/DroppableElement";
type Props = {
  children: JSX.Element[];
};

export const DragndropMultiple: FC<Props> = ({ children }) => {
  const [state, setState] = useState<DragnItemsList[]>(childIterator(children));

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    const isNotChangeCol = sInd === dInd;

    if (isNotChangeCol) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = moveItems(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  const deleteItem = (ind: number, index: number) => {
    const newState = [...state];
    newState[ind].splice(index, 1);
    setState(newState.filter((group) => group.length));
  };

  return (
    <div>
      <button
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
      </button>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <DroppableElement
              ind={ind}
              el={el}
              key={ind}
              deleteItem={deleteItem}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
