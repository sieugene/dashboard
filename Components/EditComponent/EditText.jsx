/* @flow */

import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { useEditor } from "./useEditor";

export const EditText = ({ id }) => {
  const { editorState, setEditorState } = useEditor(id);

  return (
    <div className="rdw-storybook-root">
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
    </div>
  );
};
