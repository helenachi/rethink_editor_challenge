import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import path from "path";

import css from "./style.css";

function MarkdownEditor({ file, write }) {
  const [value, setValue] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      setValue(await file.text());
      setEditedValue(await file.text());
      setEditMode(false);
    })();
  }, [file]);

  const handleTextareaChange = (event) => {
    const edited = event.target.value;
    setEditedValue(edited);
  };

  const editBox = (
    <textarea
      disabled={!editMode}
      defaultValue={value}
      value={editedValue}
      onChange={handleTextareaChange}
      cols={61}
      rows={10}
    ></textarea>
  );

  const editButtons = (
    <div>
      <button
        className={css.modeButton}
        onClick={() => {
          setEditedValue(value);
          setEditMode(false);
        }}
      >
        Close
      </button>
      <button
        className={css.saveButton}
        onClick={() => {
          setValue(editedValue);
          write(file, editedValue);
        }}
      >
        Save
      </button>
    </div>
  );

  const editComponent = editMode ? (
    <div className={css.editor}>
      <div className={css.title}>
        Markdown Editor Mode - {path.basename(file.name)}
      </div>
      <div className={css.content} onClick={() => setEditMode(true)}>
        {editBox}
      </div>
      <div className={css.content}>{editButtons}</div>
    </div>
  ) : (
    <></>
  );

  return (
    <div className={css.container}>
      <div className={css.editor} onClick={() => setEditMode(!editMode)}>
        <div className={css.title}>{path.basename(file.name)}</div>
        <div className={css.content}>
          <ReactMarkdown source={editedValue} />
        </div>
      </div>
      {editComponent}
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func,
};

export default MarkdownEditor;
