import React, { FC } from "react";
import { DraggableCard } from "../Card/DraggableCard";
import { Droppable } from "react-beautiful-dnd";
import { DragnItemsList } from "../../Utils/countInArray";
import s from "./DroppableElement.module.scss";

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#c8ebf6a3" : "#ffffffa3",
  padding: grid,
});

type Props = {
  ind: number;
  el: DragnItemsList;
  deleteItem: (ind: number, index: number) => void;
};

export const DroppableElement: FC<Props> = ({ ind, el, deleteItem }) => {
  return (
    <Droppable droppableId={`${ind}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          className={s.drop__element}
          {...provided.droppableProps}
        >
          {el.map((item, index) => (
            <DraggableCard
              item={item}
              index={index}
              key={item.id}
              ind={ind}
              deleteItem={deleteItem}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
