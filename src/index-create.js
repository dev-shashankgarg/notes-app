import 'core-js/stable'
import 'regenerator-runtime/runtime'

import {fetchNote , removeNote , saveNote} from './utils/notes-utils'
import {renderLastEdited} from './utils/notes-dom'

console.log('index-create initialized!')

const noteId = location.hash.substring(1)
const foundNote = fetchNote(noteId)
if(!foundNote) {
    location.assign('/index.html')
}

const titleField = document.querySelector('#titleId')
const descriptionField = document.querySelector('#descriptionId')

renderLastEdited(foundNote.lastModified)
titleField.value = foundNote.title
descriptionField.textContent = foundNote.description

titleField.addEventListener('input' , (event) => {
    renderLastEdited(foundNote.lastModified)
    saveNote(noteId , {
        title: event.target.value
    })
})

descriptionField.addEventListener('input' , (event) => {
    renderLastEdited(foundNote.lastModified)
    saveNote(noteId , {
        description: event.target.value
    })
})

document.querySelector('#removeBtn').addEventListener('click' , (event) => {
    removeNote(noteId)
    location.assign('/index.html')
})

document.querySelector('#backBtn').addEventListener('click' , (event) => {
    location.assign('/index.html')
})

window.addEventListener('storage' , (event) => {

    if(event.key === 'notes'){
       let notes = JSON.parse(event.newValue)
        const noteId = location.hash.substring(1)

        let foundNote = notes.find(note => note.id === noteId)

        if(!foundNote) {
            location.assign('/index.html')
        }

        const titleField = document.querySelector('#titleId')
        const descriptionField = document.querySelector('#descriptionId')

        titleField.value = foundNote.title
        descriptionField.textContent = foundNote.description
        renderLastEdited(foundNote.lastModified)
    }
})