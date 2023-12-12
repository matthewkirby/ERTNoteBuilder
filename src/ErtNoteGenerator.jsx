import styles from "./css/ErtNoteGenerator.module.css";
import { useState } from 'react';
import NotePreview from "./components/NotePreview";
import PlayerList from "./components/PlayerList";

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

  const [noteBody, setNoteBody] = useState(null);



  const addElementToNote = (player) => {
    let newNote = undefined;
    if (noteBody === null) {
      newNote = [player];
    } else {
      newNote = [...noteBody, player];
    }
    setNoteBody(newNote);
  }




  return (
    <div className={styles.ertNoteGenerator}>
      <div className={styles.raiderList}>
        <PlayerList role="dps" playerList={playerList} addElementToNote={addElementToNote} />
        <PlayerList role="tank" playerList={playerList} addElementToNote={addElementToNote} />
        <PlayerList role="healer" playerList={playerList} addElementToNote={addElementToNote} />
      </div>

      <NotePreview
        contents={noteBody}
      />
    </div>
  );
}

export default ErtNoteGenerator;