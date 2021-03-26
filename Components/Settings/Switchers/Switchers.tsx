import { Switch } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateToggle } from "../../../store/actions/Settings";
import { fieldToggle } from "../../../store/reducers/SettingsReducer";
import style from "./Switchers.module.scss";
import { useSwitchers } from "./useSwitchers";

export const Switchers: FC = () => {
  const { autoSave, progressBar, localstorage, load } = useSwitchers();

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
          disabled={localstorage || load}
        />
        Auto save
      </div>
      <div className={style.swticher}>
        <Switch
          checked={progressBar}
          onChange={(checked) => onChange(checked, "progressBar")}
          disabled={localstorage || load}
        />
        Progress bar
      </div>
      {/* <div className={style.swticher}>
        <Switch
          checked={localstorage}
          onChange={(checked) => onChange(checked, "localstorage")}
        />
        Use localstorage
      </div> */}
    </>
  );
};
