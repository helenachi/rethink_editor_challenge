import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import path from "path";

import css from "./style.css";

function PlaintextEditor({ file, write }) {
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
      defaultValue={value}
      value={editedValue}
      onChange={handleTextareaChange}
      cols={61}
      rows={10}
    ></textarea>
  );

  const editButtons = editMode ? (
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
  ) : (
    <></>
  );

  const modeText = editMode ? "Plaintext Editor Mode" : "Preview";

  return (
    <div className={css.editor}>
      <div className={css.title}>
        {modeText} - {path.basename(file.name)}
      </div>
      <div className={css.content} onClick={() => setEditMode(true)}>
        {editBox}
      </div>
      <div className={css.content}>{editButtons}</div>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func,
};

export default PlaintextEditor;
