import styles from "../css/CommandCenter.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const CommandCenter = ({ insertNewRow, exportNote, tooltipVisible }) => {

  // Put button with up/down halves and arrow unicode things to specify if inserting line above or below selection

  return (
    <div className={styles.commandCenter}>
      <FontAwesomeIcon className={[styles.commandIcon, styles.delete].join(' ')} icon={faCaretDown} />
      <div className={styles.command} onClick={() => insertNewRow()}>Insert New Row</div>
      <div className={styles.command}>Insert Text Field</div>
      <div
        className={[styles.command, styles.flushRight, styles.tooltipBase].join(' ')}
        onClick={() => exportNote()}
      >
        Copy to Clipboard
        <div className={[styles.tooltipText, tooltipVisible ? "visible" : "hidden"].join(' ')}>Copied!</div>
      </div>
    </div>

  );
};

export default CommandCenter;