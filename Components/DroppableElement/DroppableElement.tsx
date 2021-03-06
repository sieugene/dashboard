import React, { FC } from "react";
import { DraggableCard } from "../Card/DraggableCard";
import { Droppable } from "react-beautiful-dnd";
import { DragnItemsList } from "../../Utils/countInArray";
import s from "./DroppableElement.module.scss";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver
    ? "rgb(246 204 167 / 58%)"
    : "rgb(227 227 227 / 58%)",
});

type Props = {
  ind: number;
  el: DragnItemsList;
  deleteItem: (ind: number, index: number, id?: string) => void;
  openModal: (id: string) => void;
};

export const DroppableElement: FC<Props> = React.memo(
  ({ ind, el, deleteItem, openModal }) => {
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
                openModal={openModal}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
);
