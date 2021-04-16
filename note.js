const addBtn = document.getElementById("submit");
const textArea = document.querySelector("textarea");
const addNotes = document.querySelector(".display-notes");
addAllNotes();
function addAllNotes() {
    const Notes = fetchFromLocalStorage();
    for (let i = 0; i < Notes.length; i++) {
        let noteEl = document.createElement("div");
        noteEl.classList.add("note");
        noteEl.innerHTML = `<button class="delete" onclick="delteNotes('${Notes[i]}')"><i class="fa fa-times" aria-hidden="true"></i></button>
        <p>${Notes[i]}</p>`
        addNotes.appendChild(noteEl);
    }
}
function fetchFromLocalStorage() {
    const Notes = JSON.parse(localStorage.getItem("notes"));
    if (Notes == null)
        return [];
    else
        return Notes;
}
function addToLocalStorage(value) {
    const Notes = fetchFromLocalStorage();
    Notes.push(value);
    localStorage.setItem("notes", JSON.stringify(Notes));
}
function removeAndUpdate(value) {
    const Notes = fetchFromLocalStorage();
    localStorage.setItem("notes", JSON.stringify(Notes.filter(note => note != value)));
    for (let i = 0; i < Notes.length; i++) {
        console.log(Notes[i]);
    }
}
function addANote() {
    const value = textArea.value;
    textArea.value = "";
    addToLocalStorage(value);
    let noteEl = document.createElement("div");
    noteEl.classList.add("note");
    noteEl.innerHTML = `<button class="delete" onclick="delteNotes('${value}')"><i class="fa fa-times" aria-hidden="true"></i></button>
    <p>${value}</p>`
    addNotes.appendChild(noteEl);
}
addBtn.addEventListener("click", () => {
    addANote();
})
function delteNotes(note) {
    removeAndUpdate(note);
    addNotes.innerHTML = "";
    addAllNotes();
}
