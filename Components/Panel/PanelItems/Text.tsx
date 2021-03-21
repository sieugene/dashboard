import style from "./Text.module.scss";
import { FileTextOutlined } from "@ant-design/icons";
export const Text = () => {
  return (
    <div className={style.panel__item}>
      <div className={style.icon}>
        <FileTextOutlined />
      </div>
      <div className={style.title}>Text</div>
    </div>
  );
};
