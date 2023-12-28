import styles from "css/Note.module.css";
import NotePreview from "./NotePreview";
import TabBar from "./TabBar";
import React from "react";
import { CursorTypes, NoteListType, SetCursorType, UpdateNoteExtraInput, UpdateNoteModeTypes, UpdateNoteNewContent } from "types/commonTypes";

interface NoteProps {
  noteList: NoteListType;
  activeTab: number;
  setActiveTab: (newActiveTab: number) => void;
  cursor: CursorTypes;
  setCursor: SetCursorType;
  updateNote: (
    mode: UpdateNoteModeTypes,
    newContent: UpdateNoteNewContent,
    extraInput: UpdateNoteExtraInput) => void;
  addNoteTab: () => void;
  deleteNoteTab: () => void;
};

const Note: React.FC<NoteProps> =
  ({ noteList, activeTab, setActiveTab, cursor, setCursor, updateNote, addNoteTab, deleteNoteTab }) => {
  const activeNote = noteList[activeTab];
  const nTabs = noteList.length;

  return (
    <div className={styles.note}>
      <TabBar
        nTabs={nTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        addNoteTab={addNoteTab}
        deleteNoteTab={deleteNoteTab}
      />

      <NotePreview
        contents={activeNote}
        cursor={cursor}
        setCursor={setCursor}
        onChangeTextField={(newValue: string) => updateNote("updateTextField", newValue, undefined)}
      />
    </div>
  );

};

export default Note;