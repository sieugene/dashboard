import { Row } from "antd";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { DragndropMultiple } from "../Components/DragndropWrapper";
import { Settings } from "../Components/Settings/Settings";
import { service } from "../services";

export default function Home() {
  const getAll = () => {
    service.allEditors().then(({ data }) => {
      // console.log(data);
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
        {process.browser && (
          <DragndropMultiple>
            <>
              <div>List 2</div>
            </>
            <>
              <div>List 2</div>
            </>
          </DragndropMultiple>
        )}
      </Row>

      <footer></footer>
    </>
  );
}
