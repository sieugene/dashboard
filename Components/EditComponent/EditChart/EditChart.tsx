import { EditOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { FC } from "react";
import { Chart } from "react-charts";
import { ChartData, EditorsValue } from "../../../store/types/Editor";
import { dbclick } from "../../../Utils/dbclick";
import { ChartInput } from "../../ChartInput/ChartInput";
import { Popup } from "../../Modal/Popup";
import { useEditor } from "../useEditor";
import style from "./EditChart.module.scss";

type UseEditor = {
  editorState: EditorsValue;
  setEditorState: (content: ChartData) => void;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  id: string;
};

export const EditChart: FC<Props> = ({ id }) => {
  const {
    editorState,
    setEditorState,
    isModalVisible,
    setIsModalVisible,
  }: UseEditor = useEditor(id, "Chart");

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
  const getLabel = React.useCallback((series) => series?.label ?? "", []);

  const openEdit = () => {
    setIsModalVisible(true);
  };

  return (
    <div
      style={{
        width: "372",
        height: "318px",
        position: "relative",
        marginTop: "14px",
      }}
      onClick={(event) => dbclick(event, openEdit)}
    >
      <Popup
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        className={style.popup}
        title="Chart edit"
        id={id}
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
            <ChartInput
              value={data as ChartData}
              setChartData={setEditorState}
            />
          </Col>
        </Row>
      </Popup>
      {!isModalVisible && (
        <>
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
