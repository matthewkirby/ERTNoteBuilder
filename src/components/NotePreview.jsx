import styles from "../css/NotePreview.module.css";
import Player from "./Player";


const NotePreview = ({ contents, cursor, setCursor }) => {

  if (contents === null) { return <div className={styles.notePreview} style={{padding:"1em"}}>Get Started</div>}

  return (
    <div className={styles.notePreview} onClick={(e) => setCursor(null)}>
      {contents.map((row, i) => {
        return <NoteRow row={row} rowNumber={i} cursor={cursor} setCursor={setCursor} key={i} />;
      })}
    </div>
  );


};

const NoteRow = ({ row, rowNumber, cursor, setCursor }) => {

  const cursorIsCell = Array.isArray(cursor);
  const focusThisRow = cursor === rowNumber;

  const handleCellCursorAssignmentClicks = (cellIndex) => {
    if (cursorIsCell && cursor[0] === rowNumber && cursor[1] === cellIndex+1) {
      setCursor(rowNumber);
    } else {
      setCursor([rowNumber, cellIndex+1]);
    }
  };

  return (
    <div className={[styles.row, focusThisRow ? "cursorFocus" : ""].join(' ')}>
      <div className={styles.rowHeader} onClick={(e) => {e.stopPropagation(); setCursor(rowNumber);}}>{rowNumber+1}</div>
      <div className={styles.rowPreview}>
        {row.map((entry, i) => {
          if (entry.type === "player") {
            return (
              <Player
                playerInfo={entry}
                focus={cursorIsCell ? cursor[0] === rowNumber && cursor[1] === i+1 : false}
                onClick={() => handleCellCursorAssignmentClicks(i)}
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