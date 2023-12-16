import styles from "../css/Player.module.css";

const Player = ({playerInfo, focus, onClick}) => {

  return (
    <div
      className={[styles.playerBox, playerInfo.class, focus ? "cursorFocus" : ""].join(' ')}
      onClick={onClick !== undefined ? (e) => {e.stopPropagation(); onClick(playerInfo);} : undefined }
    >
      {playerInfo.name}
    </div>
  );
}

export default Player;