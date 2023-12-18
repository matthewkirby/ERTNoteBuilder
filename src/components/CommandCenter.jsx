import styles from "../css/CommandCenter.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { baselineTextElement } from "../utils";
import { ButtonWithTwoModes, TripleButton } from "./ModularButtons";


// Triple button with insertLeft/Replace/insertRight buttons
// Replacing a cell should check type and only replace if same type. Otherwise insert after
// Deleting the note should confirm you want to do that


const CommandCenter = ({ cursor, insertBehavior, setInsertBehavior, insertNewRow, addElement, deleteElement, exportNote, tooltipVisible }) => {

  return (
    <div className={styles.commandCenter}>

      <div
        className={[styles.command, cursor === null ? "" : `${styles.commandSelectors} ${styles.buttonDelete}`].join(' ')}
        onClick={() => deleteElement()}
      >
        <FontAwesomeIcon icon={faTrashCan} size="lg" />
      </div>
      <ButtonWithTwoModes textPrimary="New Row" onClick={insertNewRow} className={styles.command} childClassName={styles.commandSelectors} />
      <div className={[styles.command, styles.commandSelectors].join(' ')} onClick={() => addElement(baselineTextElement, true)}>Text Field</div>

      <TripleButton
        activeButton={insertBehavior}
        buttonLabels={["◀", "Replace", "▶"]}
        values={["left", "replace", "right"]}
        onClick={setInsertBehavior}
        className={styles.command}
        childClassName={styles.commandSelectors}
      />

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