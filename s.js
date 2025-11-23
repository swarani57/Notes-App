const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const addBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

const colors = ["#cfe1ff", "#ffe0d6", "#fffbcf", "#e5d9ff", "#d1fae5"];

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.style.backgroundColor = note.color;

    card.innerHTML = `
      <div class="note-title">${note.title}</div>
      <div class="note-content">${note.content}</div>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    notesContainer.appendChild(card);
  });
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title && !content) {
    alert("Please write a note!");
    return;
  }

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  notes.push({ title, content, color: randomColor });
  saveNotes();
  renderNotes();

  titleInput.value = "";
  contentInput.value = "";
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
  }
});

renderNotes();

