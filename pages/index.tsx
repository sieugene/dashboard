import { Row } from "antd";
import Head from "next/head";
import { DragndropMultiple } from "../Components/DragndropWrapper";
import { EditComponent } from "../Components/EditComponent/EditComponent";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditComponent />
      <Row justify="center">
        {process.browser && (
          <DragndropMultiple>
            <div>ELEMENT</div>
            <div>
              ELEMENT 2<div>ELEMENT 2CHILD</div>
            </div>
            <div>
              ELEMENT 3<div>ELEMENT 3CHILD</div>
            </div>
          </DragndropMultiple>
        )}
      </Row>

      <footer></footer>
    </>
  );
}
