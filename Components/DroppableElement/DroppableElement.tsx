import React from "react";
import { DraggableCard } from "../Card/DraggableCard";
import { Droppable } from "react-beautiful-dnd";

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

export const DroppableElement = ({ ind, el }) => {
  return (
    <Droppable key={ind} droppableId={`${ind}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          {el.map((item, index) => (
            <DraggableCard item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
