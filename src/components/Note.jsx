import styles from "css/Note.module.css";
import NotePreview from "./NotePreview";
import TabBar from "./TabBar";


const Note = ({ noteList, activeTab, setActiveTab, cursor, setCursor, updateNote, addNoteTab, deleteNoteTab }) => {
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
        onChangeTextField={(newValue) => updateNote("updateTextField", newValue)}
      />
    </div>
  );

};

export default Note;