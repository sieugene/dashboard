import style from "./PanelItem.module.scss";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
  text: string;
};
export const PanelItem: FC<Props> = ({ children, text }) => {
  return (
    <div className={style.panel__item}>
      <div className={style.icon}>{children}</div>
      <div className={style.title}>{text}</div>
    </div>
  );
};
