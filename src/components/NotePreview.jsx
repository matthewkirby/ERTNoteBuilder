import styles from "../css/NotePreview.module.css";
import Player from "./Player";


const NotePreview = ({ contents, cursor, setCursor }) => {

  if (contents === null) { return <div className={styles.notePreview} style={{padding:"1em"}}>Get Started</div>}

  return (
    <div className={styles.notePreview}>
      {contents.map((row, i) => {
        return <NoteRow row={row} rowNumber={i} cursor={cursor} setCursor={setCursor} key={i} />;
      })}
    </div>
  );


};

const NoteRow = ({ row, rowNumber, cursor, setCursor }) => {

  const cursorIsCell = Array.isArray(cursor);
  const focusThisRow = cursor === rowNumber;

  return (
    <div className={[styles.row, focusThisRow ? "cursorFocus" : ""].join(' ')}>
      <div className={styles.rowHeader} onClick={(e) => setCursor(rowNumber)}>{rowNumber+1}</div>
      <div className={styles.rowPreview}>
        {row.map((entry, i) => {
          if (entry.type === "player") {
            return (
              <Player
                playerInfo={entry}
                focus={cursorIsCell ? cursor[0] === rowNumber && cursor[1] === i+1 : false}
                onClick={() => setCursor([rowNumber, i+1])}
                key={i}
              />
            );
          } else {
            return "";
          }
        })}
      </div>
    </div>
  );

};

export default NotePreview