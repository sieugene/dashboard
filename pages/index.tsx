import { Row } from "antd";
import axios from "axios";
import Head from "next/head";
import { DragndropMultiple } from "../Components/DragndropWrapper";
import { EditImageUpload } from "../Components/EditComponent/EditImageUpload";

export default function Home() {
  const addData = () => {
    axios.post("http://localhost:3000/api/editors", null, {
      params: {
        data: { test: "key" },
      },
    });
  };
  const getAll = () => {
    axios.get("http://localhost:3000/api/editors");
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={addData}>call</button>
      <button onClick={getAll}>get</button>

      <Row justify="center">
        {process.browser && (
          <DragndropMultiple>
            <EditImageUpload id={"test"} />
            <div>test</div>
            {/* <EditImageUpload id={"test2"} />
            <EditImageUpload id={"test3"} /> */}
          </DragndropMultiple>
        )}
      </Row>

      <footer></footer>
    </>
  );
}
