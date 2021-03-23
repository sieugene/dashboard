import style from "./PanelItem.module.scss";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  children: React.ReactNode;
  text: string;
  draggableId: string | number;
  index: number;
};
export const PanelItem: FC<Props> = ({
  children,
  text,
  draggableId,
  index,
}) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={style.panel__item}>
            <div className={style.icon}>{children}</div>
            <div className={style.title}>{text}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
