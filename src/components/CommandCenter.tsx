import styles from "css/CommandCenter.module.css";
import React, { SetStateAction } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faPlay, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CompositeActionButton, TriStateSwitch } from "./Buttons";
import { CursorTypes, InsertBehaviorTypes, NoteElementDataTypes, RowInsertDirectionTypes } from "types/commonTypes";
import { baselineTextElement } from "utils/constants";


// Triple button with insertLeft/Replace/insertRight buttons
// Replacing a cell should check type and only replace if same type. Otherwise insert after
// Deleting the note should confirm you want to do that

interface CommandCenterProps {
  cursor: CursorTypes;
  insertBehavior: InsertBehaviorTypes;
  setInsertBehavior: React.Dispatch<SetStateAction<InsertBehaviorTypes>>;
  insertNewRow: (rowInsertDirection: RowInsertDirectionTypes) => void;
  addElement: (element: NoteElementDataTypes) => void;
  deleteElement: () => void;
  exportNote: () => void;
  tooltipVisible: boolean;
};

const CommandCenter: React.FC<CommandCenterProps> =
  ({ cursor, insertBehavior, setInsertBehavior, insertNewRow, addElement, deleteElement, exportNote, tooltipVisible }) => {

  return (
    <div className={styles.commandCenter}>

      <div
        className={[styles.command, cursor === null ? "" : `${styles.commandSelectors} ${styles.buttonDelete}`].join(' ')}
        onClick={() => deleteElement()}
      >
        <FontAwesomeIcon icon={faTrashCan} size="lg" />
      </div>
      <CompositeActionButton textPrimary="New Row" onClick={insertNewRow} className={styles.command} childClassName={styles.commandSelectors} />
      <div className={[styles.command, styles.commandSelectors].join(' ')} onClick={() => addElement(baselineTextElement)}>Text Field</div>

      <TriStateSwitch
        activeButton={insertBehavior}
        buttonLabels={[<FontAwesomeIcon icon={faPlay} flip="horizontal" size="lg" />, "Replace", <FontAwesomeIcon icon={faPlay} size="lg" />]}
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