import React, { FC, useState } from "react";
import { ChartData } from "../EditComponent/EditChart/EditChart";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import style from "./ChartInput.module.scss";

type Props = {
  value: ChartData;
  setChartData: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        data: number[][];
      }[]
    >
  >;
};

export const ChartInput: FC<Props> = ({ value, setChartData }) => {
  const [inputData] = useState(value);
  const onChange = ({ error, json }) => {
    if (!error) {
      try {
        setChartData(JSON.parse(json));
      } catch (error) {}
    }
  };
  return (
    <JSONInput
      id="a_unique_id"
      placeholder={inputData}
      onChange={onChange}
      locale={locale}
      height="550px"
      width="100%"
    />
  );
};
