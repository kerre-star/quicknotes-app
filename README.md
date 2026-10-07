# QuickNotes

QuickNotes is a simple note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, sort them into Personal, Work or Study categories, search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add a note with a category (Personal, Work or Study)
- Each note is shown as a card with its text, a category label, the date and time it was created, and a Delete button
- Colour-coded left borders for each category
- Validation: empty notes and notes over 200 characters show an error message
- Delete a single note
- Live search that ignores upper and lower case, with a message when nothing matches
- Correct note count message for no notes, one note and many notes
- Notes saved to `localStorage`, so they survive a page refresh
- "Clear all" button that asks for confirmation before deleting every note
- Responsive layout: the form stacks vertically on screens 600px wide or narrower

## How to run locally

No installation or build step is needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/kerre-star/quicknotes-app.git
   ```
2. Open the project folder:
   ```bash
   cd quicknotes-app
   ```
3. Open `index.html` in your web browser (double-click the file, or open it from VS Code with the Live Server extension).

## Files

- `index.html` – page structure
- `style.css` – layout, note cards, category styles and the responsive rule
- `script.js` – adding, deleting, searching, validation and saving
- `README.md` – this file

## What I learned

- **The render pattern:** change the data first, save it, then redraw the whole list from the array. Rebuilding the list in one `render()` function keeps the screen and the data in step.
- **Safe DOM building:** creating elements with `createElement` and filling them with `textContent` is safer than putting user text into `innerHTML`, because the text can never be treated as HTML.
- **Persistence with `localStorage`:** arrays must be turned into text with `JSON.stringify` before saving and back into arrays with `JSON.parse` when loading.
- **Event handling and closures:** each Delete button remembers the `id` of its own note, so it removes the right one.
- **Git history and exact naming:** committing after each task makes the project history easy to follow, and folder and file names must match the brief exactly.
