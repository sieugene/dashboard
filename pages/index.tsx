import { Row } from "antd";
import Head from "next/head";
import { DragndropMultiple } from "../Components/DragndropWrapper";
import { EditImageUpload } from "../Components/EditComponent/EditImageUpload";
import { NodraggableElement } from "../Components/NodraggableElement/NodraggableElement";
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
      <button onClick={addData}>call</button>
      <button onClick={getAll}>get</button>

      <Row justify="center">
        {process.browser && (
          <DragndropMultiple>
            <EditImageUpload id={"test"} />
            <EditImageUpload id={"test2"} />
          </DragndropMultiple>
        )}
      </Row>

      <footer></footer>
    </>
  );
}
