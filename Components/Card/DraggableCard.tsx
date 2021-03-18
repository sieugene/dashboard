import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DragnItem } from "../../Utils/countInArray";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

type Props = {
  deleteItem: (ind: number, index: number) => void;
  index: number;
  ind: number;
  item: DragnItem;
};

export const DraggableCard: FC<Props> = ({ item, index, deleteItem, ind }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {item.content}
            <button
              type="button"
              onClick={() => {
                deleteItem(ind, index);
              }}
            >
              delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};
