const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");

function addNote(){
    
    const noteObject = {
        id: generateId(),
        content: noteInput.value,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElement);
}

function createNote(id, content, fixed){

    const element = document.createElement("div")

    element.classList.add("note")

    const textArea = document.createElement("textarea")

    textArea.value = content;

    textArea.placeholder = "add same text";

    element.appendChild(textArea);

    return element;
}

function generateId() {
    return Math.floor(Math.random() * 5000);
}


addNoteBtn.addEventListener("click", () => addNote())

