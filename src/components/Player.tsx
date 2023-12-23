import { NoteElementDataTypes, PlayerData } from "types/commonTypes";
import styles from "../css/Player.module.css";
import React from "react";

interface PlayerProps {
  playerInfo: PlayerData;
  focus: boolean;
  onClick: ((element: NoteElementDataTypes) => void) | (() => void);
};

const Player: React.FC<PlayerProps> = ({playerInfo, focus, onClick}) => {

  return (
    <div
      className={[styles.playerBox, playerInfo.class, focus ? "cursorFocus" : ""].join(' ')}
      onClick={(e) => {e.stopPropagation(); onClick(playerInfo);}}
    >
      {playerInfo.name}
    </div>
  );
}

export default Player;