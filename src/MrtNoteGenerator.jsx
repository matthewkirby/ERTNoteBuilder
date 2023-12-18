import styles from "./css/MrtNoteGenerator.module.css";
import { useState } from 'react';
import NotePreview from "./components/NotePreview";
import PlayerList from "./components/PlayerList";
import CommandCenter from "./components/CommandCenter";
import { baselineTextElement, exportNote, isCursorValid } from "./utils";

const playerList = [
  { name: "Nidwhal", class: "mage", role: "dps", type: "player" },
  { name: "Yodiechit", class: "druid", role: "dps", type: "player" },
  { name: "Cawcawlin", class: "druid", role: "dps", type: "player" },
  { name: "Autisticman", class: "hunter", role: "dps", type: "player" },
  { name: "Lxh", class: "hunter", role: "dps", type: "player" },
  { name: "Ovarybusta", class: "paladin", role: "dps", type: "player" },
  { name: "Lichie", class: "shaman", role: "dps", type: "player" },
  { name: "Dripsoup", class: "death_knight", role: "dps", type: "player" },
  { name: "Dirianlock", class: "warlock", role: "dps", type: "player" },
  { name: "Arcjr", class: "demon_hunter", role: "dps", type: "player" },
  { name: "Cutedhxd", class: "demon_hunter", role: "dps", type: "player" },
  { name: "Blindhurs", class: "demon_hunter", role: "dps", type: "player" },
  { name: "Relicdruid", class: "druid", role: "dps", type: "player" },
  { name: "Brickboi", class: "rogue", role: "dps", type: "player" },
  { name: "Vilae", class: "rogue", role: "dps", type: "player" },
  { name: "Mocuscumday", class: "rogue", role: "dps", type: "player" },
  { name: "Neoblaze", class: "evoker", role: "dps", type: "player" },
  { name: "Narutoes", class: "evoker", role: "dps", type: "player" },
  { name: "Hrof", class: "warrior", role: "tank", type: "player" },
  { name: "Jedideadeye", class: "death_knight", role: "tank", type: "player" },
  { name: "Peondh", class: "demon_hunter", role: "tank", type: "player" },
  { name: "Simpyuwu", class: "evoker", role: "healer", type: "player" },
  { name: "Kalpkalp", class: "priest", role: "healer", type: "player" },
  { name: "Sylvuss", class: "priest", role: "healer", type: "player" },
  { name: "Faythope", class: "monk", role: "healer", type: "player" },
  { name: "Freelessons", class: "shaman", role: "healer", type: "player" },
  { name: "Iamalsotater", class: "paladin", role: "healer", type: "player" }
]


const MrtNoteGenerator = () => {

  const [noteBody, setNoteBody] = useState([[]]);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Cursor represents where we are inserting things
  // null: everything appended to the end of the note
  // number (0, 1, 2, etc): a row is selected. Append cells to the end of the row. Lines added
  //    above/below as chosen in command center
  // pair (e.g. [0,3]): a cell is selected. First number is row, second number is cell. The row header is 0,0
  //    and 0,1 is the first entry in a row. Replaces the selected cell.
  //    A row can be added above or below according to command center
  const [cursor, setCursor] = useState(null)
  const [insertBehavior, setInsertBehavior] = useState("replace");


  const addElementToNote = (element, focusNewElement=false) => {
    if (!isCursorValid(cursor, noteBody)) {
      setCursor(null);
      return;
    }

    if (noteBody === null) {
      setNoteBody([[element]]);
      return;
    }

    // Identify where to insert the new element
    let inCursor = null;
    let nDelete = 0;
    let newCursor = null;
    if (cursor === null && insertBehavior === "left")
      inCursor = [0,1];
    else if (cursor === null && insertBehavior === "replace")
      inCursor = [noteBody.length-1, noteBody[noteBody.length-1].length + 1];
    else if (cursor === null && insertBehavior === "right")
      inCursor = [noteBody.length-1, noteBody[noteBody.length-1].length + 1];
    else if (typeof cursor === "number" && insertBehavior === "left")
      inCursor = [cursor, 1];
    else if (typeof cursor === "number" && insertBehavior === "replace")
      inCursor = [cursor, noteBody[cursor].length + 1];
    else if (typeof cursor === "number" && insertBehavior === "right")
      inCursor = [cursor, noteBody[cursor].length + 1];
    else if (Array.isArray(cursor) && insertBehavior === "left") {
      inCursor = [cursor[0], cursor[1]];
      newCursor = [cursor[0], cursor[1]+1];
    } else if (Array.isArray(cursor) && insertBehavior === "replace") {
      inCursor = [cursor[0], cursor[1]];
      nDelete = 1;
    } else if (Array.isArray(cursor) && insertBehavior === "right")
      inCursor = [cursor[0], cursor[1]+1]

    let newNote = [...noteBody];
    let newRow = [...newNote[inCursor[0]]];
    newRow.splice(inCursor[1]-1, nDelete, element);
    newNote[inCursor[0]] = newRow;
    setNoteBody(newNote);
    if (focusNewElement) {
      setCursor(inCursor);
    } else if (newCursor !== null) {
      setCursor(newCursor);
    }
  }

  const insertNewRow = (position) => {
    let insertIndex = noteBody.length;
    if (cursor === null) {
      if (position === "up") {
        insertIndex = 0;
      }
    } else if (position !== "primary") {
      const cursorRow = Array.isArray(cursor) ? cursor[0] : cursor;
      switch (position) {
        case "up": insertIndex = cursorRow; break;
        case "down": insertIndex = cursorRow + 1; break;
        default: insertIndex = cursorRow;
      }
    }

    let newNote = [...noteBody];
    newNote.splice(insertIndex, 0, [])
    setNoteBody(newNote);
    setCursor(insertIndex);
  }

  const deleteElement = () => {
    let newNote = [...noteBody];
    let newCursor = null;
    if (Array.isArray(cursor)) {
      const rowIndex = cursor[0];
      let newRow = [...newNote[rowIndex]];
      newRow.splice(cursor[1] - 1, 1);
      newNote[rowIndex] = newRow;
      newCursor = cursor[1] === 1 ? null : [rowIndex, cursor[1] - 1];
    } else if (cursor !== null) {
      newNote.splice(cursor, 1);
      newCursor = cursor === 0 ? null : cursor - 1;
    }

    if (newNote.length === 0) {
      newNote = [[]];
    }
    setNoteBody(newNote);
    setCursor(newCursor);
  }

  // This function can be replaced by addElementToNote if the cursor is always on a focused input field
  const onChangeTextField = (cellPosition, newValue) => {
    const [row, cell] = cellPosition;
    if (row > noteBody.length - 1 || row < 0 || cell < 0 || cell > noteBody[row].length) {
      console.log(`Cell position ${cellPosition} is invalid in changeTextField.`);
      return;
    }

    let newTextField = JSON.parse(JSON.stringify(baselineTextElement));
    newTextField.content = newValue;
    let newRow = [...noteBody[row]];
    let newNote = [...noteBody];
    newRow[cell-1] = newTextField;
    newNote[row] = newRow;
    setNoteBody(newNote);
  }

  const showCopiedTooltip = () => {
    setTooltipVisible(true);

    setTimeout(() => {
      setTooltipVisible(false);
    }, 6000);
  }

  return (
    <div className={styles.mrtNoteGenerator}>
      <div className={styles.primaryNoteGenerator}>
        <div className={styles.raiderList}>
          <PlayerList role="dps" playerList={playerList} addElementToNote={addElementToNote} />
          <PlayerList role="tank" playerList={playerList} addElementToNote={addElementToNote} />
          <PlayerList role="healer" playerList={playerList} addElementToNote={addElementToNote} />
        </div>

        <NotePreview
          contents={noteBody}
          cursor={cursor}
          setCursor={setCursor}
          onChangeTextField={onChangeTextField}
        />
      </div>

      <CommandCenter
        cursor={cursor}
        insertBehavior={insertBehavior}
        setInsertBehavior={setInsertBehavior}
        insertNewRow={insertNewRow}
        addElement={addElementToNote}
        deleteElement={deleteElement}
        exportNote={() => { exportNote(noteBody); showCopiedTooltip(); }}
        tooltipVisible={tooltipVisible}
      />
    </div>
  );
}

export default MrtNoteGenerator;