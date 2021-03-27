import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DragnItem } from "../../Utils/countInArray";
import { DropdownItem } from "../DropdownItem/DropdownItem";
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
  deleteItem: (ind: number, index: number, id?: string) => void;
  openModal: (id: string) => void;
  index: number;
  ind: number;
  item: DragnItem;
};

export const DraggableCard: FC<Props> = React.memo(
  ({ item, index, ind, deleteItem, openModal }) => {
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
            <DropdownItem className={style.left}>
              <div
                onClick={() => {
                  openModal(item.id);
                }}
              >
                Edit
              </div>
              <div
                className={style.danger}
                onClick={() => {
                  deleteItem(ind, index, item.id);
                }}
              >
                Delete item
              </div>
            </DropdownItem>
            <div>{!snapshot.isDragging ? item.content : "перемещаем"}</div>
          </div>
        )}
      </Draggable>
    );
  }
);
