import { Button, Row, Steps, message, Col } from "antd";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useState } from "react";
import Guide from "../Components/Guide/Guide";

const { Step } = Steps;

const steps = [
  {
    title: "First",
    content: <Guide.Main />,
  },
  {
    title: "Second",
    content: <Guide.local />,
  },
  {
    title: "Last",
    content: <Guide.info />,
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row justify="center">
        <Col span={18}>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => {
                  message.success("Processing complete!")
                  setTimeout(() => {
                    router.push('/editor')
                  }, 0);
                }}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </Col>
      </Row>

      <footer></footer>
    </>
  );
}
