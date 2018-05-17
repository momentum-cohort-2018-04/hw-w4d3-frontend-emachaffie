import request from 'superagent'

let notesList = []
console.log(notesList)

window.addEventListener('load', function () {
  getAndUpdateNotes()
})

// Event listener to open note form and make new note button dissappear on click of new note button
document.getElementById('newNoteButton').addEventListener('click',
  function () {
    document.getElementById('addNewNoteForm').classList.remove('hidden')
    document.getElementById('newNoteButton').classList.add('hidden')
  })

// Function to turn note into html
function noteToHTML (note) {
  return `
  <div class = "listedNote" data-note-id="${note._id}">
    <h2>${note.title}</h2>
    <p>${note.text}</p>
    <p>${note.tags.join(', ')}</p>
    <button type = "button" class = "edit" data-note-id="${note._id}">Edit</button>
    <button type = "button" class = "delete" data-note-id="${note._id}">Delete</button>
  </div>`
}

// Function to stick previous function's html into page html
function notesToHTML (notes) {
  console.log(notes)
  return notes.map(x => noteToHTML(x)).join('\n')
}

// Function to edit a note
// Edit button set on click to open form for editing, then do a put request with appropriate id

// Function to update notes
function updateNotes (notesList) {
  const notesDisplayArea = document.getElementById('notesDisplayArea')
  notesDisplayArea.innerHTML = notesToHTML(notesList)
  notesDisplayArea.querySelectorAll('delete').forEach(button => {
    button.addEventListener('click', event => {
      const noteId = button.dataset.noteId
      console.log(button.dataset.noteId)
      deleteNote(noteId)
    })
  })
}

// Function to delete a note
function deleteNote (noteId) {
  request
    .delete(`https://notes-api.glitch.me/api/notes/${noteId}`)
    .auth('liz', 'dogsarebetterthancats')
    .then(response => {
      notesList = notesList.filter(note => note._id !== noteId)
      console.log(notesList)
    })
}

deleteNote('20G6qbWrI2JSzl3W')

function getAndUpdateNotes () {
  request
    .get('https://notes-api.glitch.me/api/notes')
    .auth('liz', 'dogsarebetterthancats')
    .then(response => {
      notesList = response.body.notes
      updateNotes(notesList)
      console.log('getandupdatenotes', notesList)
    })
}

// Function to add new note, needs to be event listener on submit button
document.getElementById('addNewNoteForm').addEventListener('submit', function (event) {
  event.preventDefault()

  const title = document.getElementById('noteTitle').value
  const text = document.getElementById('noteBody').value
  const tags = document.getElementById('tags').value.split(/\s*,\s*/)
  console.log(title)
  console.log(text)
  console.log(tags)
  console.log(notesList)

  request
    .post('https://notes-api.glitch.me/api/notes')
    .auth('liz', 'dogsarebetterthancats')
    .send({
      title: title,
      text: text,
      tags: tags
    })
    .then(response => {
      document.getElementById('addNewNoteForm').reset()
      document.getElementById('addNewNoteForm').classList.add('hidden')
      document.getElementById('newNoteButton').classList.remove('hidden')
      console.log(response.body)
      console.log(notesList)
      notesList.push(response.body)
      updateNotes(notesList)
    })
    .catch((err) => {
      console.error(err)
    })
})
