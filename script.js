// ---------- 1. Select the elements we need ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const category = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");

// ---------- 2. Data: an array of note objects ----------
let notes = [];

// ---------- 3. Draw the notes on the page ----------
function render() {
  list.replaceChildren(); // clear the old list (no innerHTML)

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const info = document.createElement("div");

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text; // safe for user text

    const meta = document.createElement("p");
    meta.classList.add("note-meta");

    const label = document.createElement("span");
    label.classList.add("note-label");
    label.textContent = note.category;

    const date = document.createElement("span");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    meta.appendChild(label);
    meta.appendChild(date);
    info.appendChild(text);
    info.appendChild(meta);

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "Delete";
    del.classList.add("delete-btn");

    li.appendChild(info);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// ---------- 4. Add a note ----------
function addNote(text, categoryValue) {
  notes.push({
    id: Date.now(),
    text: text,
    category: categoryValue,
    createdAt: new Date().toLocaleString(),
  });
  render();
}

// ---------- 5. Listen for the form ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addNote(input.value.trim(), category.value);
  input.value = "";
  input.focus();
});

// ---------- 6. Draw once when the page first loads ----------
render();
