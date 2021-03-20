import React, { FC } from "react";
type Props = {
  children: React.ReactNode;
  draggable?: Boolean;
};

export const NodraggableElement: FC<Props> = ({
  children,
  draggable = false,
}) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>{children}</div>
  );
};

NodraggableElement.defaultProps = {
  draggable: false,
};
