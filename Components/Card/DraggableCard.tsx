import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DragnItem } from "../../Utils/countInArray";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle,
});

type Props = {
  deleteItem: (ind: number, index: number) => void;
  index: number;
  ind: number;
  item: DragnItem;
};

export const DraggableCard: FC<Props> = ({ item, index }) => {
  if (!item.draggable) {
    return <>{item.content}</>;
  }
  return (
    <Draggable draggableId={item.id} index={index} mode="virtual">
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
            {/* <button
              type="button"
              onClick={() => {
                deleteItem(ind, index);
              }}
            >
              delete
            </button> */}
          </div>
        </div>
      )}
    </Draggable>
  );
};
