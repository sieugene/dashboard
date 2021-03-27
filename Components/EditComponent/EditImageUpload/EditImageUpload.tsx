/* @flow */

import React, { FC, useState } from "react";
import dynamic from "next/dynamic";
const Editor: React.ComponentType<any> = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { useEditor } from "../useEditor";
import { service } from "../../../services";
import { Popup } from "../../Modal/Popup";
import { dbclick } from "../../../Utils/dbclick";
type Props = {
  id: string;
  type?: string;
};

export const EditImageUpload: FC<Props> = ({ id }) => {
  const {
    editorState,
    setEditorState,
    isModalVisible,
    setIsModalVisible,
  } = useEditor(id);

  const openEdit = () => {
    setIsModalVisible(true);
  };
  function uploadImageCallBack(file) {
    return new Promise(async (resolve, reject) => {
      if (process.env.NODE_ENV === "development") {
        const fd = new FormData();
        fd.append("file", file, file.name);
        try {
          const { data } = await service.upload(fd);
          if (data?.link) {
            resolve({ data: { link: data.link } });
          }
        } catch (error) {}
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({ data: { link: e.target.result } });
        };
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      }
    });
  }

  return (
    <div className="rdw-storybook-root">
      <Popup
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Text with image edit"
        id={id}
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
