// ---------- 1. Select the elements we need ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const category = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

const MAX_CHARS = 200;
const STORAGE_KEY = "quicknotes";

// ---------- 2. Data: an array of note objects, saved in localStorage ----------
let notes = loadNotes();

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return []; // damaged data: start fresh
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ---------- 3. Draw the notes on the page ----------
function render() {
  list.replaceChildren(); // clear the old list

  const term = searchInput.value.trim().toLowerCase();
  const visible = notes.filter((note) =>
    note.text.toLowerCase().includes(term)
  );

  visible.forEach((note) => {
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
    del.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(info);
    li.appendChild(del);
    list.appendChild(li);
  });

  if (visible.length === 0 && term !== "") {
    const empty = document.createElement("li");
    empty.classList.add("message");
    empty.textContent = "No notes match your search.";
    list.appendChild(empty);
  }

  // Count message: none, one, many
  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

// ---------- 4. Add a note ----------
function addNote(text, categoryValue) {
  notes.push({
    id: Date.now(),
    text: text,
    category: categoryValue,
    createdAt: new Date().toLocaleString(),
  });
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

function showError(message) {
  errorMessage.textContent = message;
}

// ---------- 5. Listen for the form ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    return;
  }
  if (text.length > MAX_CHARS) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  showError(""); // valid note: clear any old error
  addNote(text, category.value);
  input.value = "";
  input.focus();
});

searchInput.addEventListener("input", render);

// ---------- 6. Draw once when the page first loads ----------
render();
