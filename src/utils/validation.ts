import { CursorTypes, NoteType } from "types/commonTypes";

function isCursorValid(cursor: CursorTypes, noteBody: NoteType): boolean {
  if (typeof cursor === 'number') {
    if (cursor > noteBody.length - 1 || cursor < 0) return false;
  } else if (Array.isArray(cursor)) {
    const [row, cell] = cursor;
    if (row > noteBody.length - 1 || row < 0) return false;
    if (cell < 1 || cell > noteBody[row].length) return false;
  }
  return true;
};

const validateChangeTab = (proposedTab: number, nTabs: number): number => {
  let newTab = proposedTab;
  if (proposedTab < 0)
    newTab = 0;
  if (proposedTab > nTabs-1)
    newTab = nTabs-1;
  return newTab;
};

export { isCursorValid, validateChangeTab };