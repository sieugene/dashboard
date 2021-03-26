import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DragnItem } from "../../Utils/countInArray";
import style from "./DraggableCard.module.scss";

const getItemStyle = (isDraggingOver, draggableStyle, isDragging) => {
  return {
    padding: 8,
    // cursor: isDraggingOver ? "drag" : "auto",
    background: isDragging ? "lightgreen" : "white",
    ...draggableStyle,
  };
};

type Props = {
  deleteItem: (ind: number, index: number) => void;
  index: number;
  ind: number;
  item: DragnItem;
};

export const DraggableCard: FC<Props> = React.memo(
  ({ item, index, deleteItem, ind }) => {
    return (
      <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDraggingOver,
              provided.draggableProps.style,
              snapshot.isDragging
            )}
            className={style.card}
          >
            <div>
              {!snapshot.isDragging ? item.content : "перемещаем"}
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
  }
);
