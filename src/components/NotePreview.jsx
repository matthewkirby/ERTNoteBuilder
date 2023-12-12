import styles from "../css/NotePreview.module.css";
import Player from "./Player";


const NotePreview = ({ contents }) => {


  if (contents === null) { return <div className={styles.notePreview}>Get Started</div>}

  return (
    <div className={styles.notePreview}>
      <NoteRow
        row={contents}
      />
    </div>
  );


};

const NoteRow = ({ row }) => {

  return (
    <>
      {row.map((entry, i) => {
        if (entry.type === "player") {
          return <Player playerInfo={entry} key={i} />
        } else {
          return <></>;
        }
      })}
    </>
  );

};

export default NotePreview