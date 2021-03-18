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
            <EditImageUpload />
            <EditImageUpload />
            <EditImageUpload />
            <div>
              <div>Element</div>
            </div>
            <div>
              <div>Element2</div>
            </div>
          </DragndropMultiple>
        )}
      </Row>

      <footer></footer>
    </>
  );
}
