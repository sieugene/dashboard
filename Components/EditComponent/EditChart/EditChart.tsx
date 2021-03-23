import { EditOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useState } from "react";
import { Chart } from "react-charts";
import { ChartInput } from "../../ChartInput/ChartInput";
import { Popup } from "../../Modal/Popup";
import style from "./EditChart.module.scss";
export type ChartData = {
  label: string;
  data: number[][];
}[];

const staticData: ChartData = [
  {
    label: "Series 1",
    data: [
      [0, 1],
      [1, 2],
      [2, 4],
      [3, 2],
      [4, 7],
    ],
  },
  {
    label: "Series 2",
    data: [
      [0, 3],
      [1, 1],
      [2, 5],
      [3, 6],
      [4, 4],
    ],
  },
];

export const EditChart = () => {
  const [chartData, setChartData] = useState<ChartData>(staticData);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  const data = React.useMemo(() => chartData, [chartData]);
  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  const series = React.useMemo(
    () => ({
      showPoints: true,
    }),
    []
  );
  const getLabel = React.useCallback((series) => series.label, []);

  const openEdit = () => {
    setIsModalVisible(true);
  };

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        position: "relative",
      }}
    >
      <Popup
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        className={style.popup}
        title="Chart edit"
      >
        <Row className={style.wrapModal} justify="space-between">
          <Col xs={24} sm={24} md={10} lg={10} xl={10} className={style.col}>
            <Chart
              data={data}
              axes={axes}
              series={series}
              getLabel={getLabel}
              tooltip
            />
          </Col>
          <Col xs={24} sm={24} md={10} lg={10} xl={10} className={style.col}>
            <ChartInput value={data} setChartData={setChartData} />
          </Col>
        </Row>
      </Popup>
      {!isModalVisible && (
        <>
          <div className={style.edit} onClick={openEdit}>
            <EditOutlined />
          </div>
          <Chart
            data={data}
            axes={axes}
            series={series}
            getLabel={getLabel}
            tooltip
          />
        </>
      )}
    </div>
  );
};
