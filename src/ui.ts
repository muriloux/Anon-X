function createAddButton() {
  const addCoordDiv = document.getElementById("addCoordDiv");

  const addButton = document.createElement("button");
  addButton.innerText = "Add coord";

  addCoordDiv?.appendChild(addButton);
}

export { createAddButton };
