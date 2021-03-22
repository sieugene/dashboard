/* @flow */

import { CloudUploadOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import style from "./EditVideo.module.scss";

export const EditVideo = () => {
  const input = useRef();
  const [state, setstate] = useState(null);
  const contentEditable = useRef(null);
  const handleChange = (evt) => {
    setstate({ html: evt.target.value });
  };

  // FILE

  const onchange = (event) => {
    const { files } = event.target;
    if (files?.length) {
      const videoUrl = URL.createObjectURL(files[0]);
      videoUrl && setstate({ html: createVideoTag(videoUrl) });
    }
  };

  const createVideoTag = (url) => {
    return `
    <div>
    <h2>Video</h2>
      <video
      class="video-container video-container-overlay"
      autoPlay="false"
      loop="false"
      muted="true"
      data-reactid=".0.1.0.0"
      controls="true"
      style="width: 300px"
    >
      <source type="video/mp4" data-reactid=".0.1.0.0.0" src="${url}" />
    </video>
    <br/>
    </div>
      `;
  };
  return (
    <div style={{ position: "relative" }}>
      {!state && (
        <form className={style.uploadContainer}>
          <input
            ref={input}
            name="video"
            type="file"
            onChange={onchange}
            accept="video/*"
            capture="camcorder;fileupload"
            className={style.videoInput}
          />
          <label htmlFor="video">
            <CloudUploadOutlined />
            Drop video here
          </label>
        </form>
      )}
      {state?.html && (
        <ContentEditable
          innerRef={contentEditable}
          html={state.html}
          disabled={false}
          onChange={handleChange}
          tagName="div"
          className={style.video}
        />
      )}
    </div>
  );
};
