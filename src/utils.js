
function exportNote(noteBody) {
  if (noteBody === null) { return; }
  let noteString = "";

  for (let i = 0; i < noteBody.length; i++) {
    for (let j = 0; j < noteBody[i].length; j++) {
      if (noteBody[i][j].type === "player") {
        noteString += `${noteBody[i][j].name} `
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


export default exportNote;