import {
  onAddCoordButtonClick,
  toggleCoordsList,
  updateCoordsList,
} from "./functions";

import "./popup.css";

const addCoordButton = document.getElementById(
  "addCoordButton"
) as HTMLButtonElement;
const addCoordInput = document.getElementById(
  "addCoordInput"
) as HTMLInputElement;
const toggleCoordsButton = document.getElementById(
  "toggleCoordsButton"
) as HTMLButtonElement;

//updateCoordsList();

addCoordButton?.addEventListener("click", () => {
  onAddCoordButtonClick();
  toggleCoordsList(true);
});
addCoordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    onAddCoordButtonClick();
    toggleCoordsList(true);
  }
});

toggleCoordsButton.addEventListener("click", () => toggleCoordsList());
