import { TextFieldData, WarcraftClasses } from "types/commonTypes";

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

export { maxNoteTabs, baselineTextElement, classColors };