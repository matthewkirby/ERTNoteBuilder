import styles from "../css/CommandCenter.module.css";

const CommandCenter = ({ insertNewRow }) => {

  // Put button with up/down halves and arrow unicode things to specify if inserting line above or below selection

  return (
    <div className={styles.commandCenter}>
      <div className={styles.command} onClick={() => insertNewRow()}>Insert New Row</div>
      <div className={styles.command}>Insert Text Field</div>
      <div className={`${styles.command} ${styles.flushRight}`}>Copy to Clipboard</div>
    </div>

  );
};

export default CommandCenter;