import React, { useState, useEffect } from "react";
import sanitizeHtml from "sanitize-html";

const NoteTab = (props) => {
  const { showNote } = props;

  useEffect(() => {
    // startAutosave();
  }, []);

  interface note {
    content?: any;
    formatVersion?: string;
    dateModified?: number;
    dateCreated?: number;
  }

  let noteId: string = window.location.hash.substring(1);
  let noteContainer = document.getElementById("js-note-container");

  const newNote = (): object => {
    const note: note = {};
    note["content"] = "";
    note["formatVersion"] = "1.1";
    note["dateModified"] = Date.now();
    note["dateCreated"] = Date.now();
    return note;
  };

  const startAutosave = () => {
    const returnNote = (event: any) => {
      let noteText = sanitizeHtml(event.target.innerHTML, {
        allowedTags: ["strong", "b", "i", "div", "em", "br"],
        allowedAttributes: {},
      });
    };
    noteContainer.addEventListener("input", returnNote);
  };

  return (
    <div
      className="note-wrapper"
      style={{
        position: "fixed",
        top: "0",
        height: "100%",
        width: "30%",
        backgroundColor: "#141414",
        transform: showNote ? "translateX(0%)" : "translateX(-100%)",
        transition: "all 0.3s ease-in",
      }}
    >
      <div
        className="note-container"
        id="js-note-container"
        // autoFocus
        contentEditable
        style={{
          padding: "40px",
          minHeight: "100%",
          whiteSpace: "pre-wrap",
          outline: "0",
        }}
      >
        This area is editable, click here and try it out! Hit <em>escape</em> to
        hide.
      </div>
    </div>
  );
};

export default NoteTab;
