import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import style from "./Loader.module.scss";

export const Loader = () => {
  const antIcon = <LoadingOutlined spin />;
  return (
    <div className={style.loaderWrap}>
      <Spin indicator={antIcon} />
    </div>
  );
};
