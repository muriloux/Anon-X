type localStorageKey = "coords";

function saveToLocalStorage(key: localStorageKey, value: {}) {
  const currentCoordsData = getFromLocalStorage("coords");
  const newCoords: {}[] = currentCoordsData;
  newCoords.push(value);

  localStorage.setItem(key, JSON.stringify(newCoords));
}

function getFromLocalStorage(key: localStorageKey) {
  const data = localStorage.getItem(key);
  //console.log("Got from LocalStorage");
  return data ? (JSON.parse(data) as {}[]) : [];
  // data ? console.log(JSON.parse(data)) : console.log("");
}

export { saveToLocalStorage, getFromLocalStorage };
