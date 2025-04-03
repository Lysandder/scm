let db = JSON.parse(localStorage.getItem("db")) || {
  1: { name: "LDSP", qty: 12 },
  2: { name: "Паралон", qty: 8 },
};

function loadPage() {
  

  let container = document.getElementById("container");
  container.innerHTML = "";

  Object.entries(db).forEach(([key, value]) => {
    let box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
      <div class="materialName">${value.name}</div>
      <div class="quantity">${value.qty}</div>
      <div class="counter">
        <button class="decrease">-</button>
        <input type="number" id="${key}" class="counterValue" value="0" />
        <button class="increase">+</button>
      </div>
    `;
    container.appendChild(box);
  });

  addEventListeners();
};

function addEventListeners() {
  document.querySelectorAll(".counter button").forEach(button => {
    button.addEventListener("click", function(event) {
      let inputField = event.target.closest(".counter").querySelector("input");
      let id = inputField.id; // Get the item's ID

      if (db[id]) {
        if (event.target.matches(".increase")) {
          db[id].qty++;
        } else if (event.target.matches(".decrease") && db[id].qty > 0) {
          db[id].qty--;
        }

        inputField.value = db[id].qty; // Update input field
        event.target.closest(".box").querySelector(".quantity span").textContent = db[id].qty; // Update displayed quantity
        localStorage.setItem("db", JSON.stringify(db)); // Save to localStorage
      }
    });
  });
};

function saveAndLoad() {
  localStorage.setItem("db", JSON.stringify(db));
  loadPage();
};

loadPage();
