import { useEffect } from 'react';
import { InsertBehaviorTypes, NoteListType } from "types/commonTypes";


const useLocalStorage = <T>(key: string, state: T): void => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
};

const getLocalStorage = <T>(key: string, defaultState: T): T => {
  const state = localStorage.getItem(key) ?? JSON.stringify(defaultState);
  return JSON.parse(state);
};


// MrtNoteGenerator States
const activeTabDefault = 0;
const getActiveTab = () => getLocalStorage("activeTab", activeTabDefault);

const noteListDefault: NoteListType = [ [[]] ];
const getNoteList = () => getLocalStorage("noteList", noteListDefault);

const insertBehaviorDefault = "right";
const getInsertBehavior = () => {
  const insertBehavior = getLocalStorage<InsertBehaviorTypes>("insertBehavior", insertBehaviorDefault);
  if (["left", "replace", "right"].includes(insertBehavior)) {
    return insertBehavior as InsertBehaviorTypes;
  } else {
    console.log(`Insert behavior value from localStorage: ${insertBehavior} is invalid.`);
    return insertBehaviorDefault;
  }
};

const defaultStates = { activeTabDefault, noteListDefault, insertBehaviorDefault };

export { useLocalStorage, getActiveTab, getNoteList, getInsertBehavior, defaultStates };