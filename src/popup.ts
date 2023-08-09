import { onAddCoordButtonClick, updateCoordsList } from "./functions";

updateCoordsList();

const addCoordButton = document.getElementById(
  "addCoordButton"
) as HTMLButtonElement;
const addCoordInput = document.getElementById(
  "addCoordInput"
) as HTMLInputElement;

addCoordButton?.addEventListener("click", onAddCoordButtonClick);
addCoordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    onAddCoordButtonClick();
  }
});
