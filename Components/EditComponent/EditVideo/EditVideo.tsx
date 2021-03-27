/* @flow */

import { CloudUploadOutlined } from "@ant-design/icons";
import React, { FC, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { service } from "../../../services";
import { useEditor } from "../useEditor";
import style from "./EditVideo.module.scss";

type Props = {
  id: string;
  type?: string;
};

export const EditVideo: FC<Props> = ({ id }) => {
  const { editorState, setEditorState } = useEditor(id, "Video");
  const input = useRef();
  const [load, setload] = useState(false);
  const contentEditable = useRef(null);
  const handleChange = (evt) => {
    setEditorState(evt.target.value);
  };

  const onchange = async (event) => {
    const { files } = event.target;
    const file = files?.length && files[0];
    if (file) {
      setload(true);
      const result = await new Promise(async (resolve, reject) => {
        let videoUrl;
        const reader = new FileReader();
        reader.onload = (e) => {
          videoUrl = URL.createObjectURL(file);
        };
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);

        const fd = new FormData();
        fd.append("file", file, file.name);

        if (process.env.NODE_ENV === "development") {
          try {
            const { data } = await service.upload(fd);
            if (data?.link) {
              resolve(data.link);
            }
          } catch (error) {
          } finally {
            setload(false);
            videoUrl = null;
          }
        } else {
          setTimeout(() => {
            setload(false);
            resolve(videoUrl);
            videoUrl = null;
          }, 1500);
        }
      });
      result && setEditorState(createVideoTag(result));
    }
  };

  const createVideoTag = (url) => {
    return `
    <div>
    <h2>Video</h2>
      <video
      class="video-container video-container-overlay"
      muted="true"
      data-reactid=".0.1.0.0"
      controls
    >
      <source type="video/mp4" data-reactid=".0.1.0.0.0" src="${url}" />
    </video>
    <br/>
    </div>
      `;
  };
  return (
    <div className={style.videoWrap}>
      {!editorState && (
        <form className={`${style.uploadContainer} ${load ? style.load : ""}`}>
          <input
            ref={input}
            name="video"
            type="file"
            onChange={onchange}
            accept="video/*"
            capture="camcorder;fileupload"
            className={style.videoInput}
            disabled={load}
          />
          <label htmlFor="video">
            <CloudUploadOutlined />
            {load ? "Loading..." : "Drop video here"}
          </label>
        </form>
      )}
      {editorState && (
        <ContentEditable
          innerRef={contentEditable}
          html={editorState as string}
          disabled={false}
          onChange={handleChange}
          tagName="div"
          className={style.video}
        />
      )}
    </div>
  );
};
