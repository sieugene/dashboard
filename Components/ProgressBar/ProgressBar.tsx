import { Progress } from "antd";
import React, { useEffect, useState } from "react";
import style from "./ProgressBar.module.scss";
import { useSelector } from "react-redux";

let interval;

export const ProgressBar = () => {
  const [percent, setPercent] = useState(0);
  const saveProgress = useSelector((state) => state.editors.saveProgress);
  const progressBar = useSelector((state) => state.settings.progressBar);
  const timer = (timeout, percent) => {
    let nextPercent = percent;
    interval = setInterval(() => {
      nextPercent = nextPercent + 10 <= 99 ? nextPercent + 10 : 99;
      setPercent(nextPercent);
    }, timeout);
  };
  useEffect(() => {
    if (saveProgress) {
      timer(600, 0);
    } else {
      clearInterval(interval);
      setPercent(100);
    }
    return () => {
      clearInterval(interval);
    };
  }, [saveProgress]);
  return (
    <>
      {progressBar && (
        <div
          className={style.progressWrap}
          style={{ opacity: percent === 100 ? 0 : 1 }}
        >
          <Progress percent={percent} />
        </div>
      )}
    </>
  );
};
