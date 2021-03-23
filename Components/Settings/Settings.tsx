import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { useDispatch } from "react-redux";
import style from "./Settings.module.scss";
import { Switchers } from "./Switchers/Switchers";

export const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} className={style.fixedButton}>
        Settings
      </Button>
      <Drawer
        title="Settings app"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Switchers />
        <Button>Force Save</Button>
      </Drawer>
    </>
  );
};
