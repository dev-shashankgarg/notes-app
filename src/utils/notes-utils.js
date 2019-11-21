import moment from 'moment'
import uuidv4 from 'uuid/v4'

let notes = []

const loadNotes = () => {
    const storedData = localStorage.getItem('notes')
    if(storedData){
        try{
        notes =  JSON.parse(storedData)
        }catch(exception){
            console.log(`Could not parse notes: ${exception.message}`)
            notes = []
            saveAllNotes()
        }
    }else{
        notes = []
    }
}

const fetchNote = (id) => {
    let foundNote = notes.find((note) => note.id === id)
    if(foundNote) return foundNote
}

const fetchAllNotes = () => {return notes}

const saveNote = (id , {title , description}) => {
    let existingNote = fetchNote(id)
    if(title) existingNote.title = title
    if(description) existingNote.description = description
    existingNote.lastModified = moment().valueOf()

    saveAllNotes()
}

const saveAllNotes = () => {
    localStorage.setItem('notes' , JSON.stringify(notes))
}

const createNote = ()=> {
    let newNote = {
        id : uuidv4(),
        title : 'untitled',
        description : 'undefined',
        createdTime : moment().valueOf(),
        lastModified : moment().valueOf() 
    }

    notes.push(newNote)
    saveAllNotes()
    return newNote.id
}

const removeAllNotes = () => { 
    notes = []
    localStorage.setItem('notes' , JSON.stringify(notes))
}

const removeNote = (id) => {
    let noteIndex = notes.findIndex((note) => note.id === id)
    console.log(noteIndex)
    if(noteIndex > -1){
        notes.splice(noteIndex , 1)  
    }
    saveAllNotes()
}

loadNotes()

export {fetchNote , fetchAllNotes, createNote, removeNote , removeAllNotes , saveNote}