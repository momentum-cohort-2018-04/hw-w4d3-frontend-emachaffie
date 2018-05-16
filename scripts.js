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
      notesList = notesListfilter(note => note._id !== noteId)
      updateAllNotes(notesList)
    })
}

// Function to turn note into html

// Function to stick previous function's html into page html

// Function to edit a note

// Function to update all notes
// function updateAllNotes {

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
      tet: text,
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
