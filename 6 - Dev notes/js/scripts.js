const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");


function showNotes(){
    cleanNotes();
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content,note.fixed);

        notesContainer.appendChild(noteElement);
    });
}

function cleanNotes(){
    notesContainer.replaceChildren([]);
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: generateId(),
        content: noteInput.value,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes)

    noteInput.value = "";
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));
;

    return orderedNotes;
}

function createNote(id, content, fixed){

    const element = document.createElement("div")

    element.classList.add("note")

    const textArea = document.createElement("textarea")

    textArea.value = content;

    textArea.placeholder = "add same text";

    element.appendChild(textArea);

    if(fixed){
        element.classList.add("fixed");
    }

    const pinIcon = document.createElement("i")

    pinIcon.classList.add(...["bi", "bi-pin"]);

    element.appendChild(pinIcon);

    element.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixNote(id);
    });

    return element;
}

function toggleFixNote(id){
    const notes = getNotes();

    const targetNotes = notes.filter((note) => note.id === id
    )[0];

    targetNotes.fixed = !targetNotes.fixed;

    saveNotes(notes);

    showNotes();
}

function generateId() {
    return Math.floor(Math.random() * 5000);
}


addNoteBtn.addEventListener("click", () => addNote())

showNotes();