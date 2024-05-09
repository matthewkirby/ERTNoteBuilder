import styles from "css/MrtNoteGenerator.module.css";
import React, { useState } from 'react';
import PlayerList from "./components/PlayerList";
import CommandCenter from "./components/CommandCenter";
import { noteAddElement, noteAddRow, noteDeleteElement, noteUpdateTextField } from "utils/noteUtils";
import Note from "./components/Note";
import { CursorTypes, InsertBehaviorTypes, NoteElementDataTypes, NoteListType, NoteType, PlayerData, RowInsertDirectionTypes, UpdateNoteExtraInput, UpdateNoteModeTypes, UpdateNoteNewContent, UpdateNoteOutputType } from "types/commonTypes";
import { maxNoteTabs } from "utils/constants";
import { validateChangeTab } from "utils/validation";
import { exportNote } from "utils/helpers";

const playerList: PlayerData[] = [
  { name: "Dripstew", class: "death_knight", role: "tank", type: "player" },
  { name: "Peondh", class: "demon_hunter", role: "tank", type: "player" },

  { name: "Faythshift", class: "druid", role: "healer", type: "player" },
  { name: "Kalpkalp", class: "priest", role: "healer", type: "player" },
  { name: "Mightystormm", class: "shaman", role: "healer", type: "player" },
  { name: "Ligases", class: "priest", role: "healer", type: "player" },
  { name: "Oshley", class: "paladin", role: "healer", type: "player" },

  { name: "Cawlm", class: "monk", role: "dps", type: "player" },
  { name: "Kinalis", class: "demon_hunter", role: "dps", type: "player" },
  { name: "Furrysylv", class: "shaman", role: "dps", type: "player" },
  { name: "Vilae", class: "rogue", role: "dps", type: "player" },
  { name: "Brickblade", class: "warrior", role: "dps", type: "player" },
  { name: "Ovarybusta", class: "paladin", role: "dps", type: "player" },
  { name: "Jenkemac", class: "warrior", role: "dps", type: "player" },
  { name: "Narutobunny", class: "hunter", role: "dps", type: "player" },
  { name: "Mashpoteeto", class: "warrior", role: "dps", type: "player" },
  { name: "Nbound", class: "paladin", role: "dps", type: "player" },
  { name: "Bralesswife", class: "rogue", role: "dps", type: "player" },

  { name: "Nidwhal", class: "mage", role: "dps", type: "player" },
  { name: "Relicdragon", class: "evoker", role: "dps", type: "player" },
  { name: "Dirianlock", class: "warlock", role: "dps", type: "player" },
  { name: "Neojr", class: "mage", role: "dps", type: "player" },
  { name: "Autisticman", class: "hunter", role: "dps", type: "player" },
  { name: "Lxh", class: "hunter", role: "dps", type: "player" },
  { name: "Raptorgirl", class: "priest", role: "dps", type: "player" },
  { name: "Cutelockxd", class: "warlock", role: "dps", type: "player" },
];

const cursorDefault: null = null;
const noteListDefault: NoteListType = [ [[]] ];


const MrtNoteGenerator: React.FC = () => {

  const [activeTab, setActiveTab] = useState<number>(0);
  const [noteList, setNoteList] = useState<NoteListType>(noteListDefault);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  // Cursor represents where we are inserting things
  // null: everything appended to the end of the note
  // number (0, 1, 2, etc): a row is selected. Append cells to the end of the row. Lines added
  //    above/below as chosen in command center
  // pair (e.g. [0,3]): a cell is selected. First number is row, second number is cell. The row header is 0,0
  //    and 0,1 is the first entry in a row. Replaces the selected cell.
  //    A row can be added above or below according to command center
  const [cursor, setCursor] = useState<CursorTypes>(cursorDefault);
  const [insertBehavior, setInsertBehavior] = useState<InsertBehaviorTypes>("right");

  // Set up some helper variables
  const activeNote: NoteType = noteList[activeTab];


  const updateNote = (mode: UpdateNoteModeTypes, newContent: UpdateNoteNewContent = null, extraInput: UpdateNoteExtraInput = null) => {
    let newNoteList = [ ...noteList ];
    let output: UpdateNoteOutputType | null = null;

    if (mode === "insertElement") { // extraInput should be focusNewElement boolean
      if (newContent === null) {
        console.log("updateNote(\"insertElement\", newContent) requires an element");
        return;
      }
      const options = { insertBehavior: insertBehavior };
      output = noteAddElement(newContent, cursor, activeNote, options, extraInput ?? true);
    } else if (mode === "insertRow") { // extraInput should be rowInsertDirection "primary"||"up"||"down"
      output = noteAddRow(cursor, activeNote, extraInput ?? "primary");
    } else if (mode === "deleteElement") {
      output = noteDeleteElement(cursor, activeNote);
    } else if (mode === "updateTextField") { // extraInput
      if (newContent === null)
        console.log("updateNote(\"updateTextField\", newContent) requires a new value");
      output = noteUpdateTextField(cursor, activeNote, newContent);
    } else {
      console.log(`Note update mode >> ${mode} << unknown.`);
    }

    if (output === null) return;
    // Update note if needed
    if (output.updateNote) {
      newNoteList[activeTab] = output.noteBody;
      setNoteList(newNoteList);
    }
    // Update cursor if needed
    if (output.updateCursor) {
      setCursor(output.cursor);
    }
  };

  const addNoteTab = () => {
    if (noteList.length >= maxNoteTabs)
      return;
    let newNoteList = [ ...noteList ];
    const newLength = newNoteList.push([[]]);
    setNoteList(newNoteList);
    setCursor(cursorDefault);
    setActiveTab(newLength-1);
  }

  const deleteNoteTab = () => {
    let newNoteList = [ ...noteList ];
    newNoteList.splice(activeTab, 1);
    if(newNoteList.length === 0) {
      newNoteList = noteListDefault;
    }
    setNoteList(newNoteList);
    setCursor(cursorDefault);
    setActiveTab(validateChangeTab(activeTab-1, newNoteList.length));
  }


  const showCopiedTooltip = () => {
    setTooltipVisible(true);

    setTimeout(() => {
      setTooltipVisible(false);
    }, 6000);
  };

  const setActiveTabHelper = (newActiveTab: number) => {
    if (newActiveTab === activeTab)
      return;
    setActiveTab(newActiveTab);
    setCursor(cursorDefault);
  };


  return (
    <div className={styles.mrtNoteGenerator}>
      <div className={styles.primaryNoteGenerator}>
        <div className={styles.raiderList}>
          <PlayerList role="dps" playerList={playerList} addElementToNote={(element: NoteElementDataTypes) => updateNote("insertElement", element)} />
          <PlayerList role="tank" playerList={playerList} addElementToNote={(element: NoteElementDataTypes) => updateNote("insertElement", element)} />
          <PlayerList role="healer" playerList={playerList} addElementToNote={(element: NoteElementDataTypes) => updateNote("insertElement", element)} />
        </div>

        <Note
          noteList={noteList}
          activeTab={activeTab}
          setActiveTab={setActiveTabHelper}
          cursor={cursor}
          setCursor={setCursor}
          updateNote={updateNote}
          addNoteTab={addNoteTab}
          deleteNoteTab={deleteNoteTab}
        />

      </div>

      <CommandCenter
        cursor={cursor}
        insertBehavior={insertBehavior}
        setInsertBehavior={setInsertBehavior}
        insertNewRow={(rowInsertDirection: RowInsertDirectionTypes) => updateNote("insertRow", null, rowInsertDirection)}
        addElement={(element: NoteElementDataTypes) => updateNote("insertElement", element)}
        deleteElement={() => updateNote("deleteElement")}
        exportNote={() => { exportNote(activeNote); showCopiedTooltip(); }}
        tooltipVisible={tooltipVisible}
      />
    </div>
  );
}

export default MrtNoteGenerator;