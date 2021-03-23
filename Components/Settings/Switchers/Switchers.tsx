import { Switch } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  fieldToggle,
  updateToggle,
} from "../../../store/reducers/SettingsReducer";
import style from "./Switchers.module.scss";
import { useSwitchers } from "./useSwitchers";

export const Switchers: FC = () => {
  const { autoSave, progressBar, localstorage } = useSwitchers();

  const dispatch = useDispatch();
  function onChange(checked: Boolean, field: fieldToggle) {
    dispatch(updateToggle(field, checked));
  }
  return (
    <>
      <div className={style.swticher}>
        <Switch
          checked={autoSave}
          onChange={(checked) => onChange(checked, "autoSave")}
          disabled={localstorage}
        />
        Auto save
      </div>
      <div className={style.swticher}>
        <Switch
          checked={progressBar}
          onChange={(checked) => onChange(checked, "progressBar")}
          disabled={localstorage}
        />
        Progress bar
      </div>
      <div className={style.swticher}>
        <Switch
          checked={localstorage}
          onChange={(checked) => onChange(checked, "localstorage")}
        />
        Use localstorage
      </div>
    </>
  );
};
