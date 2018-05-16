import request from 'superagent'

let notesList = []

// Function to delete a note
function deleteNote (noteId) {
  request
    .delete("https://notes-api.glitch.me/api/notes/`${noteId}`")
    .auth('liz', 'dogsarebetterthancats')
    .then(response => {
      notesList = notesListfilter(note => note._id !== noteId)
      updateAllNotes(notesList)
    })
}

// Function to edit a note

// Function to add new note, needs to be event listener on submit button
document.getElementById('AddNewNoteForm').addEventListener('submit', function (event) {
  event.preventDefault()

  const title = document.getElementById('noteTitle').value
  const noteBody = document.getElementById('noteBody').value.split(/\s*,\s*/)
  const tags = document.getElementById('tags').value

  request
    .post(https://notes-api.glitch.me/api/notes)
    .auth('liz', 'dogsarebetterthancats')
    .send({
      noteTitle: title,
      noteBody: authors,
      tags: tags
    })
    .then(response => {
      document.getElementById('addNewNoteForm').reset()
      document.getElementById('addNewNoteForm').classList.add('hidden')
      document.getElementById('submitButton').classList.remove('hidden')
      noteList.push(response.body)
      updateNotes(noteList)
    })
    .catch((err) => {
      console.error(err)
    })