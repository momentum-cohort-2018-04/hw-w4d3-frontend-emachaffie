import request from 'superagent'

let notesList = []

// Event listener to open note form and make new note button dissappear on click of new note button

document.getElementById('newNoteButton').addEventListener('click',
  function () {
    document.getElementById('addNewNoteForm').classList.remove('hidden')
    document.getElementById('newNoteButton').classList.add('hidden')
  })

// Function to delete a note
function deleteNote (noteId) {
  request
    .delete(`https://notes-api.glitch.me/api/notes/${noteId}`)
    .auth('liz', 'dogsarebetterthancats')
    .then(response => {
      notesList = notesList.filter(note => note._id !== noteId)
      updateAllNotes(notesList)
    })
}

// Function to turn note into html
function noteToHTML (note) {
  return
  `<div class = "listedNote" data-note-id="${note._id}">
    <h2>${note.title}</h2>
    <p>${note.body}</p>
    <p>${note.tags.join(', ')}</p>
    <button type = "button" class = "edit" data-note-id="${note._id}">Edit</button>
    <button type = "button" class = "delete" data-note-id="${note._id}">Delete</button>
  </div>`
}

// Function to stick previous function's html into page html
function notesToHTML (notes) {
  return notes.map(noteToHTML).join('\n')
}

// Function to edit a note

// Function to update notes
function updateNotes (notes) {
  // const section = document.getElementById(sectionId)
  const listedDiv = document.getElementById('listedDiv')
  listedDiv.innerHTML = notesToHTML(notes)
  listedDiv.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', event => {
      const noteId = button.dataset.noteId
      deleteNote(noteId)
    })
  })
}

// Function to update all notes
function updateAllNotes (notes) {
  updateNotes('notes', notes.filter(note => note.status === 'notes'))
}

// }

// Function to add new note, needs to be event listener on submit button
document.getElementById('addNewNoteForm').addEventListener('submit', function (event) {
  event.preventDefault()

  const title = document.getElementById('noteTitle').value
  const text = document.getElementById('noteBody').value
  const tags = document.getElementById('tags').value.split(/\s*,\s*/)
  console.log(title)
  console.log(text)
  console.log(tags)

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
      notesList.push(response.body)
      // updateNotes(noteList)
    })
    // .catch((err) => {
    //   console.error(err)
    // })
})
