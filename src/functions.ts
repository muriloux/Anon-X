import {
  getFromLocalStorage,
  addItemToLocalStorage,
  addItemsToLocalStorage,
} from "./repository";

let isListVisible = false;

const coordInput = document.getElementById("addCoordInput") as HTMLInputElement;
const coordsList = document.getElementById("coordsList") as HTMLUListElement;
const chevronIcon = document.getElementById("chevronIcon") as HTMLSpanElement;

function getCurrentTabUrl(callback: Function) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].url) {
      const urlObject: URL = new URL(tabs[0].url);
      callback(urlObject);
    }
  });
}

export function addCoord() {
  const coordName = coordInput.value;

  getCurrentTabUrl((url: URL) => {
    const hash = url.hash;
    const coord = hash.replace(/#\w+,/i, "");

    addItemToLocalStorage("coords", { [coordName || coord]: coord });
    updateCoordsList();
  });

  coordInput.value = "";
}

function deleteCoord(coordKey: string) {
  const currentCoordsData: {}[] = getFromLocalStorage("coords");

  // Filter out the item with the specified key
  const updatedCoordsData = currentCoordsData.filter((coord) => {
    const key = Object.keys(coord)[0];
    return key !== coordKey;
  });

  addItemsToLocalStorage("coords", updatedCoordsData);
  updateCoordsList(); // Update the list after deleting
}

export function updateCoordsList() {
  const currentCoordsData = getFromLocalStorage("coords");

  getCurrentTabUrl((url: URL) => {
    const hash = url.hash;
    const href = url.href;
    const cleanHash = hash.replace(/,-?\d+/g, "");

    coordsList.innerHTML = "";
    currentCoordsData.forEach((coord) => {
      const coordKey = Object.keys(coord)[0];
      const newHash = `${cleanHash},${(coord as any)[coordKey]}`;
      const newURL = href.replace(hash, newHash);

      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      const deleteButton = document.createElement("button");

      anchor.innerText = coordKey;
      anchor.href = newURL;
      deleteButton.innerText = "✕";
      deleteButton.className = "deleteButton";

      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        chrome.tabs.update({ url: newURL });
      });

      deleteButton.addEventListener("click", () => {
        deleteCoord(coordKey); // Call the deleteCoord function on button click
      });

      listItem.appendChild(anchor);
      listItem.appendChild(deleteButton);
      coordsList?.appendChild(listItem);
    });
  });
}

export function toggleCoordsList(unfold?: boolean) {
  if (unfold && isListVisible) {
    return;
  }
  if (!isListVisible) {
    coordsList.style.display = "block";
    updateCoordsList();
    chevronIcon.textContent = "▲";
  } else {
    coordsList.style.display = "none";
    chevronIcon.textContent = "▼";
  }

  isListVisible = !isListVisible;
}
