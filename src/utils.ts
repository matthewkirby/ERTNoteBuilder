import { CursorTypes, NoteType, PlayerData, TextFieldData, WarcraftClasses } from "types/commonTypes";

const maxNoteTabs = 10;

const baselineTextElement: TextFieldData = {
  type: "text",
  content: "Text Field"
}

const classColors: { [K in WarcraftClasses]: string } = {
  death_knight:"C41E3A",
  demon_hunter:"A330C9",
  druid:"FF7C0A",
  evoker:"33937F",
  hunter:"AAD372",
  mage:"3FC7EB",
  monk:"00FF98",
  paladin:"F48CBA",
  priest:"FFFFFF",
  rogue:"FFF468",
  shaman:"0070DD",
  warlock:"8788EE",
  warrior:"C69B6D"
}

function formatPlayerName(playerInfo: PlayerData): string {
  const coloredName = `|cff${classColors[playerInfo.class]}${playerInfo.name}|r`;
  return coloredName;
}

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

function getTextWidth(inputText: string, fontString: string): string {
  // font should be in "#units name" format
  const canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  if (context === null) { return "50px"; }
  context.font = fontString;
  const width = context.measureText(inputText).width;
  const formattedWidth = Math.ceil(width) + "px";
  return formattedWidth;
}

function isCursorValid(cursor: CursorTypes, noteBody: NoteType): boolean {
  if (typeof cursor === 'number') {
    if (cursor > noteBody.length - 1 || cursor < 0) return false;
  } else if (Array.isArray(cursor)) {
    const [row, cell] = cursor;
    if (row > noteBody.length - 1 || row < 0) return false;
    if (cell < 1 || cell > noteBody[row].length) return false;
  }
  return true;
}

const validateChangeTab = (proposedTab: number, nTabs: number): number => {
  let newTab = proposedTab;
  if (proposedTab < 0)
    newTab = 0;
  if (proposedTab > nTabs-1)
    newTab = nTabs-1;
  return newTab;
};


export { isCursorValid, exportNote, getTextWidth, baselineTextElement, validateChangeTab, maxNoteTabs };