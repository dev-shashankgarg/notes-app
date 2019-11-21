import 'core-js/stable'
import 'regenerator-runtime/runtime'

import {fetchAllNotes , createNote , removeAllNotes} from './utils/notes-utils'
import {renderAllNotesWithSorting , renderNotes} from './utils/notes-dom'


console.log('index-home initialized !')

const intialize = () => {
    const notes = fetchAllNotes()
    const sortCondition = document.querySelector('#sortDropdown').value
    renderAllNotesWithSorting('allNoteTable' , notes, sortCondition)
}

intialize()

document.querySelector('#sortDropdown').addEventListener('change' , (event) => {
    intialize()
})

document.querySelector('#searchInput').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase()
    if(query !=='') {
    let notes = fetchAllNotes()
    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(query)
    })
        renderNotes('searchQueryTable',filteredNotes)
    }else{
        renderNotes('searchQueryTable',[])
    }
})

document.querySelector('#createNoteBtn').addEventListener('click', (event) => {
    event.preventDefault()
    const createdNoteId = createNote()
    intialize()
    location.assign(`/create-note.html#${createdNoteId}`)
})

document.querySelector('#removeAllNotesForm').addEventListener('submit', (event) => {
    event.preventDefault()
    removeAllNotes()
    intialize()
})

window.addEventListener('storage' , (event) => {
    if(event.key === 'notes'){
        let notes = JSON.parse(event.newValue)
        const sortCondition = document.querySelector('#sortDropdown').value
        renderAllNotesWithSorting('allNoteTable' , notes, sortCondition)
    }

})