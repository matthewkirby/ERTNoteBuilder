import { NoteType } from "types/commonTypes";
import { formatPlayerName } from "./formatting";


// MOVE THIS TO NOTEUTILS


function exportNote(noteBody: NoteType): void {
  if (noteBody === null) { return; }
  let noteString = "";

  for (let i = 0; i < noteBody.length; i++) {
    for (let j = 0; j < noteBody[i].length; j++) {
      const noteElement = noteBody[i][j];
      if (noteElement.type === "player") {
        noteString += `${formatPlayerName(noteElement)} `
      } else if (noteElement.type === "text") {
        noteString += `${noteElement.content} `
      }
    }
    noteString = noteString.trimEnd();
    noteString += '\n';
  }

  noteString = noteString.trimEnd();

  // console.log(noteBody)
  // console.log(`===== NOTE =====\n${noteString}`)
  navigator.clipboard.writeText(noteString);
}

export { exportNote };