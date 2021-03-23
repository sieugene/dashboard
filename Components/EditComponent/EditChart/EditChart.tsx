import { EditOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { FC, useState } from "react";
import { Chart } from "react-charts";
import { ChartData } from "../../../store/reducers/EditorReducer";
import { ChartInput } from "../../ChartInput/ChartInput";
import { Popup } from "../../Modal/Popup";
import { useEditor } from "../useEditor";
import style from "./EditChart.module.scss";

type UseEditor = {
  editorState: ChartData;
  setEditorState: (content: ChartData) => void;
};

type Props = {
  id: string;
};

export const EditChart: FC<Props> = ({ id }) => {
  const { editorState, setEditorState }: UseEditor = useEditor(id, "Chart");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const data = React.useMemo(() => editorState, [editorState]);
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
            <ChartInput value={data} setChartData={setEditorState} />
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
