import styles from "css/NotePreview.module.css";
import Player from "./Player";
import TextField from "./TextField";
import React from "react";
import { CursorTypes, NoteRowType, NoteType, SetCursorType } from "types/commonTypes";

interface NotePreviewProps {
  contents: NoteType;
  cursor: CursorTypes;
  setCursor: SetCursorType;
  onChangeTextField: (newValue: string) => void;
};

const NotePreview: React.FC<NotePreviewProps> = ({ contents, cursor, setCursor, onChangeTextField }) => {
  if (contents === null) {
    return <div className={styles.notePreview} style={{padding:"1em"}}>Get Started</div>
  }

  return (
    <div className={styles.notePreview} onClick={(e) => setCursor(null)}>
      {contents.map((row, i) => {
        return <NoteRow
          row={row}
          rowNumber={i}
          cursor={cursor}
          setCursor={setCursor}
          onChangeTextField={onChangeTextField}
          key={i}
        />;
      })}
    </div>
  );
};



interface NoteRowProps {
  row: NoteRowType;
  rowNumber: number;
  cursor: CursorTypes;
  setCursor: SetCursorType;
  onChangeTextField: (newValue: string) => void;
};

const NoteRow: React.FC<NoteRowProps> = ({ row, rowNumber, cursor, setCursor, onChangeTextField }) => {

  const cursorIsCell = Array.isArray(cursor);
  const rowFocusedHelper = cursor === rowNumber;
  const cellFocusedHelper = (cellIndex: number) => {
    if (cursorIsCell && cursor[0] === rowNumber && cursor[1] === cellIndex+1) return true;
    else return false;
  };

  const handleCellCursorAssignmentClicks = (cellIndex: number) => {
    if (cellFocusedHelper(cellIndex)) {
      setCursor(rowNumber);
    } else {
      setCursor([rowNumber, cellIndex+1]);
    }
  };

  return (
    <div className={[styles.row, rowFocusedHelper ? "cursorFocus" : ""].join(' ')}>
      <div className={styles.rowHeader} onClick={(e) => {e.stopPropagation(); setCursor(rowNumber);}}>{rowNumber+1}</div>
      <div className={styles.rowPreview}>
        {row.map((entry, i) => {
          if (entry.type === "player") {
            return (
              <Player
                playerInfo={entry}
                focus={cellFocusedHelper(i)}
                onClick={() => handleCellCursorAssignmentClicks(i)}
                key={i}
              />
            );
          } else if (entry.type === "text"){
            return (
              <TextField
                content={entry.content}
                onClick={() => setCursor([rowNumber, i+1])}
                onChange={(newValue) => onChangeTextField(newValue)}
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