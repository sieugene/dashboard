import { Row } from "antd";
import Head from "next/head";
import { DragndropMultiple } from "../Components/DragndropWrapper";
import { service } from "../services";

export default function Home() {
  const addData = () => {
    service.editorsUpdate({ test: "key" });
  };
  const getAll = () => {
    service.allEditors();
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <button onClick={addData}>call</button>
      <button onClick={getAll}>get</button> */}

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
              <div>List</div>
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
