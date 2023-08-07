import { getFromLocalStorage, saveToLocalStorage } from "./repository";

export function onAddCoordButtonClick() {
  const coordName = (
    document.getElementById("addCoordInput") as HTMLInputElement
  ).value;

  const hash = document.location.hash;
  const coord = hash.replace(/#\w+,/i, "");

  saveToLocalStorage("coords", { [coordName || coord]: coord });
  updateCoordsList();
  // console.log(`${coordName}: ${coord}`);
}

export function updateCoordsList() {
  const coordsList = document.getElementById("coordsList") as HTMLUListElement;
  const currentCoordsData = getFromLocalStorage("coords");
  const url = window.location.href;
  const hash = window.location.hash;
  const cleanHash = hash.replace(/,(\d+,\d+)/, "");

  coordsList.innerHTML = "";
  currentCoordsData.forEach((coord) => {
    const coordKey = Object.keys(coord)[0];
    const newHash = `${cleanHash},${(coord as any)[coordKey]}`;
    const newURL = url.replace(hash, newHash);

    const listItem = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.innerText = coordKey;
    anchor.href = newURL; // Use the newURL here

    listItem.appendChild(anchor);
    coordsList?.appendChild(listItem);
  });
}
