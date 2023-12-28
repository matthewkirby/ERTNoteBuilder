import { PlayerData } from "types/commonTypes";
import { classColors } from "./constants";

function formatPlayerName(playerInfo: PlayerData): string {
  const coloredName = `|cff${classColors[playerInfo.class]}${playerInfo.name}|r`;
  return coloredName;
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

export { formatPlayerName, getTextWidth };