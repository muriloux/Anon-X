import { getFromLocalStorage, saveToLocalStorage } from "./repository";

function getCurrentTabUrl(callback: Function) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].url) {
      const urlObject: URL = new URL(tabs[0].url);
      callback(urlObject);
    }
  });
}

export function onAddCoordButtonClick() {
  const coordInput = document.getElementById(
    "addCoordInput"
  ) as HTMLInputElement;
  const coordName = coordInput.value;

  getCurrentTabUrl((url: URL) => {
    const hash = url.hash;
    const coord = hash.replace(/#\w+,/i, "");

    saveToLocalStorage("coords", { [coordName || coord]: coord });
    updateCoordsList();
  });

  coordInput.value = "";
}

export function updateCoordsList() {
  const coordsList = document.getElementById("coordsList") as HTMLUListElement;
  const currentCoordsData = getFromLocalStorage("coords");

  getCurrentTabUrl((url: URL) => {
    const hash = url.hash;
    const href = url.href;
    const cleanHash = hash.replace(/,(\d+,\d+)/, "");

    coordsList.innerHTML = "";
    currentCoordsData.forEach((coord) => {
      const coordKey = Object.keys(coord)[0];
      const newHash = `${cleanHash},${(coord as any)[coordKey]}`;
      const newURL = href.replace(hash, newHash);

      const listItem = document.createElement("li");
      const anchor = document.createElement("a");

      anchor.innerText = coordKey;
      anchor.href = newURL;

      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        chrome.tabs.update({ url: newURL });
      });

      listItem.appendChild(anchor);
      coordsList?.appendChild(listItem);
    });
  });
}
