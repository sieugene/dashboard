/* @flow */

import React, { useState } from "react";
import dynamic from "next/dynamic";
const Editor: React.ComponentType<any> = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { useEditor } from "../useEditor";
import { Popup } from "../../Modal/Popup";
import { dbclick } from "../../../Utils/dbclick";

export const EditText = ({ id }) => {
  const { editorState, setEditorState } = useEditor(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openEdit = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="rdw-storybook-root">
      <Popup
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Text edit"
        id={id}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
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
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
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
