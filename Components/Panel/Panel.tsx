import React, { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import style from "./Panel.module.scss";
import { PanelItem } from "./PanelItems/PanelItem";
import {
  FileTextOutlined,
  FileImageOutlined,
  LayoutOutlined,
} from "@ant-design/icons";

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
                  <PanelItem text="Text">
                    <FileTextOutlined />
                  </PanelItem>
                </div>
              )}
            </Draggable>

            <Draggable draggableId={"EDITOR_IMAGE"} index={2}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <PanelItem text="Image">
                    <FileImageOutlined />
                  </PanelItem>
                </div>
              )}
            </Draggable>

            <Draggable draggableId={"ADD_LAYOUT"} index={3}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <PanelItem text="Layout">
                    <LayoutOutlined />
                  </PanelItem>
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
