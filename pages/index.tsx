import { Row } from "antd";
import Head from "next/head";
import { DragndropMultiple } from "../Components/DragndropWrapper";
import { EditImageUpload } from "../Components/EditComponent/EditImageUpload";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
