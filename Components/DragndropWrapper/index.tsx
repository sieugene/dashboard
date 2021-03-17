import React, { FC, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generateItems } from "../../Utils/countInArray";
import { moveItems } from "../../Utils/moveItems";
import { reorder } from "../../Utils/reorder";
import { DroppableElement } from "../DroppableElement/DroppableElement";
type Props = {
  children: any[];
};

export const DragndropMultiple: FC<Props> = ({ children }) => {
  const childIterator = () => {
    let gridItetator = 0;
    return children.reduce((items, child) => {
      if (child?.props?.children) {
        items.push(
          generateItems(
            child.props.children.length,
            gridItetator,
            child.props.children
          )
        );
        gridItetator += 10;
      }
      return items;
    }, []);
  };

  const [state, setState] = useState<any>(childIterator());

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
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
            <DroppableElement ind={ind} el={el} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
