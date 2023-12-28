import styles from "css/PlayerList.module.css";
import { NoteElementDataTypes, PlayerData, WarcraftRoles } from "types/commonTypes";
import Player from "./Player";

const roleLookup = {
  "dps": "DPS",
  "tank": "Tanks",
  "healer": "Healers"
};

interface PlayerListProps {
  role: WarcraftRoles;
  playerList: PlayerData[];
  addElementToNote: (element: NoteElementDataTypes) => void;
};

const PlayerList: React.FC<PlayerListProps> = ({ role, playerList, addElementToNote }) => {
  const subList = playerList.filter((player) => player.role === role);

  return (
    <>
      <div className={styles.heading}>{roleLookup[role]}</ div>
      {subList.map((player) => {
        return (
          <Player
            playerInfo={player}
            focus={false}
            onClick={addElementToNote}
            key={player.name}
          />
        );
      })}
    </>
  );
};


export default PlayerList;