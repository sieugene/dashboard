import { Row } from "antd";
import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DragndropMultiple } from "../Components/DragndropWrapper";
import { Settings } from "../Components/Settings/Settings";
import { service } from "../services";
import { setCols, setEditors } from "../store/reducers/EditorReducer";

export default function Home() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const getAll = () => {
    service.allEditors().then(({ data }) => {
      dispatch(setCols(data.cols));
      dispatch(setEditors(data.editors));
      setloading(false);
    });
  };
  getAll();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <button onClick={addData}>call</button>
      <button onClick={getAll}>get</button> */}
      <Settings />
      <Row
        justify="center"
        style={{
          position: "absolute",
          left: "250px",
        }}
      >
        {process.browser && !loading && (
          <DragndropMultiple>
            <></>
            <></>
          </DragndropMultiple>
        )}
      </Row>

      <footer></footer>
    </>
  );
}
