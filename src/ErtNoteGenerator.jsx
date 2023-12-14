import styles from "./css/ErtNoteGenerator.module.css";
import { useState } from 'react';
import NotePreview from "./components/NotePreview";
import PlayerList from "./components/PlayerList";
import CommandCenter from "./components/CommandCenter";

const playerList = [
  { name: "Nidwhal", class: "mage", role: "dps", type: "player" },
  { name: "Yodiechit", class: "druid", role: "dps", type: "player" },
  { name: "Cawcawlin", class: "druid", role: "dps", type: "player" },
  { name: "Autisticman", class: "hunter", role: "dps", type: "player" },
  { name: "Lxd", class: "hunter", role: "dps", type: "player" },
  { name: "Ovarybusta", class: "paladin", role: "dps", type: "player" },
  { name: "Notlichie", class: "shaman", role: "dps", type: "player" },
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
  { name: "Swartz", class: "warrior", role: "dps", type: "player" },
  { name: "Hrof", class: "warrior", role: "tank", type: "player" },
  { name: "Jedideadeye", class: "death_knight", role: "tank", type: "player" },
  { name: "ParanoidPeon", class: "demon_hunter", role: "tank", type: "player" },
  { name: "Simpyuwu", class: "evoker", role: "healer", type: "player" },
  { name: "Kalpkalp", class: "priest", role: "healer", type: "player" },
  { name: "Sylvuss", class: "priest", role: "healer", type: "player" },
  { name: "Faythope", class: "monk", role: "healer", type: "player" },
  { name: "Freelessons", class: "shaman", role: "healer", type: "player" },
  { name: "Iamalsotater", class: "paladin", role: "healer", type: "player" }
]


const ErtNoteGenerator = () => {

  const [noteBody, setNoteBody] = useState([[]]);

  // Cursor represents where we are inserting things
  // null: everything appended to the end of the note
  // number (0, 1, 2, etc): a row is selected. Append cells to the end of the row. Lines added
  //    above/below as chosen in command center
  // pair (e.g. [0,3]): a cell is selected. First number is row, second number is cell. The row header is 0,0
  //    and 0,1 is the first entry in a row. Replaces the selected cell.
  //    A row can be added above or below according to command center
  const [cursor, setCursor] = useState(null)



  const addElementToNote = (player) => {
    if (noteBody === null) {
      setNoteBody([[player]]);
      return;
    }

    let newNote = undefined;
    // If cursor is not defined, add to the end of last line
    if (cursor === null) {
      const lastRow = noteBody[noteBody.length - 1];
      newNote = [...noteBody];
      newNote[noteBody.length - 1] = [...lastRow, player]
    }
    // If cursor on a row, add to the end of that row
    else if (typeof cursor === 'number') {
      if (cursor > noteBody.length - 1 || cursor < 0) {
        setCursor(null);
        return;
      }
      const selectedRow = noteBody[cursor];
      newNote = [...noteBody];
      newNote[cursor] = [...selectedRow, player];
    }
    // If cursor is on a cell, replace that cell
    else if (Array.isArray(cursor)) {
      const [row, cell] = cursor;
      if (row > noteBody.length - 1 || row < 0 || cell < 0 || cell > noteBody[row].length) {
        setCursor(null);
        return;
      }

      let newRow = [...noteBody[row]];
      newNote = [...noteBody];
      newRow[cell-1] = player;
      newNote[row] = newRow;
    }
    setNoteBody(newNote);
  }

  const insertNewRow = () => {
    const newNote = [...noteBody, []];
    setNoteBody(newNote);
  }

  return (
    <div className={styles.ertNoteGenerator}>
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
        />
      </div>

      <CommandCenter
        insertNewRow={insertNewRow}
      />
    </div>
  );
}

export default ErtNoteGenerator;