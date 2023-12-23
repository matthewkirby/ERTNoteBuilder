export type WarcraftClasses = "death_knight" | "demon_hunter" |
  "druid" | "evoker" | "hunter" | "mage" | "monk" | "paladin" |
  "priest" | "rogue" | "shaman" | "warlock" | "warrior";
export type WarcraftRoles = "dps" | "tank" | "healer";

export interface PlayerData {
  name: string;
  class: WarcraftClasses;
  role: WarcraftRoles;
  type: "player";
};

export interface TextFieldData {

};

export type CursorTypes = null | number | [number, number];
export type InsertBehaviorTypes = "left" | "replace" | "right";
export type RowInsertDirectionTypes = "primary" | "up" | "down";

export type NoteElementDataTypes = PlayerData | TextFieldData;
export type NoteRowType = NoteElementDataTypes[];
export type NoteType = NoteRowType[];
export type NoteListType = NoteType[];



// This should be refactored
export type FixMyTypeLater = any;
export type UpdateNoteModeTypes = "insertElement" | "insertRow" |
 "deleteElement" | "updateTextField";
 export type UpdateNoteExtraInput = any;
export type UpdateNoteNewContent = NoteElementDataTypes | null;
export interface UpdateNoteOutputType {
  noteBody: NoteType;
  updateNote: boolean;
  cursor: CursorTypes;
  updateCursor: boolean;
};