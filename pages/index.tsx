import { Col, Row } from "antd";
import Head from "next/head";
import DragndropWrapper from "../Components/DragndropWrapper";
import { DragndropMultiple } from "../Components/DragndropWrapper/DragndropMultiple";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row justify="center">
        <Col>
          <DragndropWrapper>
            <div>
              <div>child in child</div>
            </div>
            <div>some</div>
          </DragndropWrapper>
        </Col>
        <Col offset={2}>
          <DragndropWrapper>
            <div>
              <div>child in child</div>
            </div>
            <div>some</div>
          </DragndropWrapper>
        </Col>
        {process.browser && <DragndropMultiple />}
      </Row>

      <footer></footer>
    </>
  );
}
