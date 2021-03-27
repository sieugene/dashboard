import { PushpinOutlined } from "@ant-design/icons";
import React from "react";
import style from "../../styles/index.module.scss";

const Guide = () => {
  return <div></div>;
};

Guide.Main = () => {
  return (
    <div className={style.guide}>
      <div className={style.title}>
        <PushpinOutlined />
        <h2>Quick dashboard Guide.</h2>
      </div>
      <ul>
        <li>To add new items, use the panel on the left.</li>
        <li>
          To edit, you can double-click on the card or hover over the drop-down
          list and click edit. (Except for using the video element).
        </li>
        <li>
          To move the cards, hold the card with the mouse and move it between
          the columns or to another column.
        </li>
        <li>
          Saving occurs automatically, the loader notifies you about it from the
          bottom, it occurs automatically after moving or editing the text after
          a few seconds. You can also make a forced save in the settings, the
          settings are located in the lower right part of the application.
        </li>
        <li>
          If you want to use save, you will need to run the application locally
          on your computer, this is done to save space on the server. (For more
          information, see step 2)
        </li>
        <li>
          To edit the graph, you must open the edit window, supported by the
          JSON editing format.
        </li>
      </ul>
    </div>
  );
};

Guide.local = () => {
  return (
    <div className={style.guide}>
      <div className={style.title}>
        <h2>How to run locally.</h2>
      </div>
      <div className={style.code}>
        <code>
          yarn install <br />
          # or <br />
          npm install <br />
          <br />
          # run local <br />
          yarn run dev <br />
          # or <br />
          npm run dev <br />
        </code>
      </div>
    </div>
  );
};

Guide.info = () => {
  return (
    <div className={style.guide}>
      <div className={style.title}>
        <h2>Info.</h2>
      </div>
      <div className={style.content}>
        <p>
          If you would like to learn more about me or contact me, please visit
          my
          <a
            href="https://sieugene.vercel.app/"
            target="_blank"
            className={style.link}
          >
            website.
          </a>
        </p>
        <p>
          The application is made in a short time and it has bugs. The main goal
          was to develop a dragndrop application, with data stored on the
          server. Includes elements of text, video, images, and chart.
        </p>
      </div>
    </div>
  );
};

export default Guide;
