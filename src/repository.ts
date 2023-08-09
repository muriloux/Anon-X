type localStorageKey = "coords";

export function saveToLocalStorage(key: localStorageKey, value: {}) {
  const currentCoordsData = getFromLocalStorage("coords");
  const newCoords: {}[] = currentCoordsData;
  newCoords.push(value);

  localStorage.setItem(key, JSON.stringify(newCoords));
}

export function getFromLocalStorage(key: localStorageKey) {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as {}[]) : [];
}
