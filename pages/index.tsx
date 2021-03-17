import { Row } from "antd";
import Head from "next/head";
import { DragndropMultiple } from "../Components/DragndropWrapper";

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
            <div>
              ELEMENT
              <div>ELEMENT CHILD</div>
            </div>
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
