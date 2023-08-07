import { onAddCoordButtonClick, updateCoordsList } from "./functions";

updateCoordsList();

const addCoordButton = document.getElementById(
  "addCoordButton"
) as HTMLButtonElement;

addCoordButton?.addEventListener("click", onAddCoordButtonClick);
