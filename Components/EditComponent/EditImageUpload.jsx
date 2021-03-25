/* @flow */

import React, { useState } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { useEditor } from "./useEditor";
import { service } from "../../services";
import { Popup } from "../Modal/Popup";
import { dbclick } from "../../Utils/dbclick";

export const EditImageUpload = ({ id }) => {
  const { editorState, setEditorState } = useEditor(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openEdit = () => {
    setIsModalVisible(true);
  };

  function uploadImageCallBack(file) {
    return new Promise(async (resolve, reject) => {
      let staticImage;
      const reader = new FileReader();
      reader.onload = (e) => {
        staticImage = { data: { link: e.target.result } };
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);

      const fd = new FormData();
      fd.append("file", file, file.name);
      try {
        const { data } = await service.upload(fd);
        if (data?.link) {
          resolve({ data: { link: data.link } });
        }
      } catch (error) {
        resolve(staticImage);
        staticImage = null;
      }
    });
  }

  return (
    <div className="rdw-storybook-root">
      <Popup
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Text with image edit"
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          toolbar={{
            image: {
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              urlEnabled: false,
              alignmentEnabled: false,
            },
          }}
        />
      </Popup>
      {!isModalVisible && (
        <div onClick={(event) => dbclick(event, openEdit)}>
          <Editor
            editorState={editorState}
            toolbarClassName="rdw-storybook-toolbar"
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
            toolbar={{
              image: {
                uploadCallback: uploadImageCallBack,
                previewImage: true,
                urlEnabled: false,
                alignmentEnabled: false,
              },
            }}
            toolbarOnFocus={true}
            toolbarHidden={true}
            readOnly={true}
          />
        </div>
      )}
    </div>
  );
};
