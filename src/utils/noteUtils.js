import { baselineTextElement } from "./constants";
import { isCursorValid } from "./validation";

const prepareOutput = (noteBody, cursor) => {
  return { noteBody: noteBody, updateNote: true, cursor: cursor, updateCursor: false };
}

// Takes the element, cursor, note, options, and optional bool to focus new element or not
// Should return an object with a cursor, noteBody, updateCursor, and updateNote field
const noteAddElement = (element, cursor, noteBody, options, focusNewElement=false) => {
  const output = prepareOutput(noteBody, cursor);

  if (!isCursorValid(cursor, noteBody)) {
    output.updateNote = false;
    output.cursor = null;
    output.updateCursor = true;
    return output;
  }

  if (noteBody === null) {
    output.noteBody = [[element]];
    return output
  }

  const insertBehavior = options.insertBehavior;

  // Identify where to insert the new element
  let inCursor = null;
  let nDelete = 0;
  let newCursor = null;
  if (cursor === null && insertBehavior === "left")
    inCursor = [0,1];
  else if (cursor === null && insertBehavior === "replace")
    inCursor = [noteBody.length-1, noteBody[noteBody.length-1].length + 1];
  else if (cursor === null && insertBehavior === "right")
    inCursor = [noteBody.length-1, noteBody[noteBody.length-1].length + 1];
  else if (typeof cursor === "number" && insertBehavior === "left")
    inCursor = [cursor, 1];
  else if (typeof cursor === "number" && insertBehavior === "replace")
    inCursor = [cursor, noteBody[cursor].length + 1];
  else if (typeof cursor === "number" && insertBehavior === "right")
    inCursor = [cursor, noteBody[cursor].length + 1];
  else if (Array.isArray(cursor) && insertBehavior === "left") {
    inCursor = [cursor[0], cursor[1]];
    newCursor = [cursor[0], cursor[1]+1];
  } else if (Array.isArray(cursor) && insertBehavior === "replace") {
    inCursor = [cursor[0], cursor[1]];
    nDelete = 1;
  } else if (Array.isArray(cursor) && insertBehavior === "right")
    inCursor = [cursor[0], cursor[1]+1]

  // Update the note's body
  let newNote = [...noteBody];
  let newRow = [...newNote[inCursor[0]]];
  newRow.splice(inCursor[1]-1, nDelete, element);
  newNote[inCursor[0]] = newRow;
  output.noteBody = newNote;
  if (focusNewElement) {
    output.cursor = inCursor;
    output.updateCursor = true;
  } else if (newCursor !== null) {
    output.cursor = newCursor;
    output.updateCursor = true;
  }
  return output;
}

// Add a row to the note
const noteAddRow = (cursor, noteBody, rowInsertDirection) => {
  const output = prepareOutput(noteBody, cursor);

  let insertIndex = noteBody.length;
  if (cursor === null) {
    if (rowInsertDirection === "up") {
      insertIndex = 0;
    }
  } else if (rowInsertDirection !== "primary") {
    const cursorRow = Array.isArray(cursor) ? cursor[0] : cursor;
    switch (rowInsertDirection) {
      case "up": insertIndex = cursorRow; break;
      case "down": insertIndex = cursorRow + 1; break;
      default: insertIndex = cursorRow;
    }
  }

  let newNote = [...noteBody];
  newNote.splice(insertIndex, 0, []);
  output.noteBody = newNote;
  output.cursor = insertIndex;
  output.updateCursor = true;
  return output;
}

// delete selected element from the note
const noteDeleteElement = (cursor, noteBody) => {
  const output = prepareOutput(noteBody, cursor);

  let newNote = [...noteBody];
  let newCursor = null;
  if (Array.isArray(cursor)) {
    const rowIndex = cursor[0];
    let newRow = [...newNote[rowIndex]];
    newRow.splice(cursor[1] - 1, 1);
    newNote[rowIndex] = newRow;
    newCursor = cursor[1] === 1 ? null : [rowIndex, cursor[1] - 1];
  } else if (cursor !== null) {
    newNote.splice(cursor, 1);
    newCursor = cursor === 0 ? null : cursor - 1;
  }

  if (newNote.length === 0)
    newNote = [[]];
  output.noteBody = newNote;
  output.cursor = newCursor;
  output.updateCursor = true;
  return output;
}

// This function can be replaced by addElementToNote if the cursor is always on a focused input field
const noteUpdateTextField = (cursor, noteBody, newValue) => {
  const output = prepareOutput(noteBody, cursor);
  if (!Array.isArray(cursor)) return output;
  const [row, cell] = cursor;

  let newTextField = JSON.parse(JSON.stringify(baselineTextElement));
  newTextField.content = newValue;
  let newNote = [...noteBody];
  let newRow = [...newNote[row]];
  newRow[cell-1] = newTextField;
  newNote[row] = newRow;
  output.noteBody = newNote;
  return output;
}

export { noteAddElement, noteAddRow, noteDeleteElement, noteUpdateTextField };