import styles from "../css/CommandCenter.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faClone } from '@fortawesome/free-solid-svg-icons';
import { baselineTextElement } from "../utils";

const CommandCenter = ({ insertNewRow, addElement, exportNote, tooltipVisible }) => {

  // Put button with up/down halves and arrow unicode things to specify if inserting line above or below selection

  // Triple button with insertLeft/Replace/insertRight buttons

  // Replacing a cell should check type and only replace if same type. Otherwise insert after

  // Added a text field should also move cursor to it

  return (
    <div className={styles.commandCenter}>
      <FontAwesomeIcon className={styles.buttonDelete} icon={faCaretDown} />
      <div className={styles.command} onClick={() => insertNewRow()}>Insert New Row</div>
      <div className={styles.command} onClick={() => addElement(baselineTextElement)}>Insert Text Field</div>
      <div
        className={[styles.command, styles.flushRight, styles.tooltipBase, styles.buttonCopy].join(' ')}
        onClick={() => exportNote()}
      >
        <FontAwesomeIcon icon={faClone} size="lg" />
        <div className={[styles.tooltipText, tooltipVisible ? "visible" : "hidden"].join(' ')}>Copied!</div>
      </div>
    </div>

  );
};

export default CommandCenter;