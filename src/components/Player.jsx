import styles from "../css/Player.module.css";

const Player = ({playerInfo, onClick}) => {
  return (
    <div
      className={`${styles.playerBox} ${playerInfo.class}`}
      onClick={onClick !== undefined ? (e) => onClick(playerInfo) : undefined }
    >
      {playerInfo.name}
    </div>
  );
}

export default Player;