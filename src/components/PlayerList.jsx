import styles from "../css/PlayerList.module.css";
import Player from "./Player";

const roleLookup = {
  "dps": "DPS",
  "tank": "Tanks",
  "healer": "Healers"
}

const PlayerList = ({ role, playerList, addElementToNote }) => {
  const subList = playerList.filter((player) => player.role === role);

  return (
    <>
      <div className={styles.heading}>{roleLookup[role]}</ div>
      {subList.map((player) => {
        return (
          <Player
            playerInfo={player}
            key={player.name}
            onClick={addElementToNote}
          />
        );
      })}
    </>
  );
};


export default PlayerList;