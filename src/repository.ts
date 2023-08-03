function saveToLocalStorage(key?: string, value?: string) {
  //localStorage.setItem(key, JSON.stringify(value));
  console.log("Saved to LocalStorage");
}

function getFromLocalStorage(key?: string) {
  // const data = localStorage.getItem(key);
  // return data ? JSON.parse(data) : null;
  console.log("Got from LocalStorage");
}

export { saveToLocalStorage, getFromLocalStorage };
