import styles from "../css/CommandCenter.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faClone } from '@fortawesome/free-solid-svg-icons';
import { baselineTextElement } from "../utils";
import { ButtonWithTwoModes } from "./ModularButtons";

const CommandCenter = ({ insertNewRow, addElement, exportNote, tooltipVisible }) => {

  // Triple button with insertLeft/Replace/insertRight buttons

  // Replacing a cell should check type and only replace if same type. Otherwise insert after

  // Added a text field should also move cursor to it

  return (
    <div className={styles.commandCenter}>
      <FontAwesomeIcon className={styles.buttonDelete} icon={faCaretDown} />
      <ButtonWithTwoModes textPrimary="New Row" onClick={insertNewRow} className={styles.command} childClassName={styles.commandSelectors} />
      <div className={[styles.command, styles.commandSelectors].join(' ')} onClick={() => addElement(baselineTextElement)}>Text Field</div>
      <div
        className={[styles.command, styles.commandSelectors, styles.flushRight, styles.tooltipBase, styles.buttonCopy].join(' ')}
        onClick={() => exportNote()}
      >
        <FontAwesomeIcon icon={faClone} size="lg" />
        <div className={[styles.tooltipText, tooltipVisible ? "visible" : "hidden"].join(' ')}>Copied!</div>
      </div>
    </div>

  );
};

export default CommandCenter;