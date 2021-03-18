import { Row } from "antd";
import Head from "next/head";
import { DragndropMultiple } from "../Components/DragndropWrapper";
import { EditComponent } from "../Components/EditComponent/EditComponent";
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
            <EditComponent></EditComponent>
            <EditComponent></EditComponent>
            <EditImageUpload />
          </DragndropMultiple>
        )}
      </Row>

      <footer></footer>
    </>
  );
}
