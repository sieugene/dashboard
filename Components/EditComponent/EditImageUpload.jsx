/* @flow */

import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve({ data: { link: e.target.result } });
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

export const EditImageUpload = () => (
  <div className="rdw-storybook-root">
    <h3>Image option supports image upload also.</h3>
    <Editor
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
      toolbar={{
        image: {
          uploadCallback: uploadImageCallBack,
          previewImage: true,
        },
      }}
    />
  </div>
);
