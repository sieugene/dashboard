import { Row, Spin } from "antd";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DragndropMultiple } from "../Components/DragndropWrapper";
import { ProgressBar } from "../Components/ProgressBar/ProgressBar";
import { Settings } from "../Components/Settings/Settings";
import { useSelector } from "react-redux";
import { fetchData } from "../store/reducers/EditorReducer";

export default function Home() {
  const loading = useSelector((state) => state.editors.load);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Settings />
      <ProgressBar />
      <Row
        justify="center"
        style={{
          position: "absolute",
          left: "250px",
        }}
      >
        {process.browser && !loading ? (
          <DragndropMultiple>
            <></>
            <></>
          </DragndropMultiple>
        ) : (
          <Spin />
        )}
      </Row>

      <footer></footer>
    </>
  );
}
