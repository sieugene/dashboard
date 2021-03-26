import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { useDispatch } from "react-redux";
import style from "./Settings.module.scss";
import { Switchers } from "./Switchers/Switchers";
import { useSelector } from "react-redux";
import { forceSaveAction } from "../../store/reducers/SettingsReducer";

export const Settings: React.FC = () => {
  const saveProgress = useSelector((state) => state.editors.saveProgress);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const forceSave = () => {
    dispatch(forceSaveAction());
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
        <Button disabled={saveProgress} onClick={forceSave}>
          Force Save
        </Button>
      </Drawer>
    </>
  );
};
