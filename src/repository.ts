type localStorageKey = "coords";

export function addItemToLocalStorage(key: localStorageKey, value: {}) {
  const currentCoordsData = getFromLocalStorage(key);
  currentCoordsData.push(value);

  localStorage.setItem(key, JSON.stringify(currentCoordsData));
}

export function addItemsToLocalStorage(key: localStorageKey, items: {}[]) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function getFromLocalStorage(key: localStorageKey) {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as {}[]) : [];
}
