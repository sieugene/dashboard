import React, { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import style from "./Panel.module.scss";
import { Text } from "./PanelItems/Text";

export const Panel: FC = () => {
  return (
    <div className={style.wrap}>
      <div className={style.title}>Elements</div>
      <Droppable droppableId={"TEXT__ELEMENT"}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId={"TEXT__ELEMENT"} index={1}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Text />
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
