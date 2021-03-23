import React, { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import style from "./Panel.module.scss";
import { PanelItem } from "./PanelItems/PanelItem";
import {
  FileTextOutlined,
  FileImageOutlined,
  LayoutOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";

export const Panel: FC = () => {
  return (
    <div className={style.wrap}>
      <div className={style.title}>Elements</div>
      <Droppable droppableId={"TEXT__ELEMENT"}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <PanelItem text="Text" draggableId={"TEXT__ELEMENT"} index={1}>
              <FileTextOutlined />
            </PanelItem>

            <PanelItem text="Image" draggableId={"EDITOR_IMAGE"} index={2}>
              <FileImageOutlined />
            </PanelItem>

            <PanelItem text="Layout" draggableId={"ADD_LAYOUT"} index={3}>
              <LayoutOutlined />
            </PanelItem>

            <PanelItem text="Video" draggableId={"VIDEO"} index={4}>
              <VideoCameraAddOutlined />
            </PanelItem>

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
