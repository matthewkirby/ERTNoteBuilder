import styles from "../css/NotePreview.module.css";
import Player from "./Player";


const NotePreview = ({ contents }) => {

  console.log(contents)


  if (contents === null) { return <div className={styles.notePreview} style={{padding:"1em"}}>Get Started</div>}

  return (
    <div className={styles.notePreview}>
      {contents.map((row, i) => {
        return <NoteRow row={row} rowNumber={i} key={i} />;
      })}
    </div>
  );


};

const NoteRow = ({ row, rowNumber }) => {

  return (
    <div className={styles.row}>
      <div className={styles.rowHeader}>{rowNumber+1}</div>
      <div className={styles.rowPreview}>
        {row.map((entry, i) => {
          if (entry.type === "player") {
            return <Player playerInfo={entry} key={i} />
          } else {
            return "";
          }
        })}
      </div>
    </div>
  );

};

export default NotePreview