import { createSlice } from '@reduxjs/toolkit'


export const journalSlice = createSlice({
    name: 'journal',
    initialState:{
        isSaving: false,
        messageSave: '',
        notes: [],
        activeNote: null,
    },
    reducers:{
        savingNewNote: (state) => {
            state.isSaving = true;
        },

        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSave = '';
        },

        setNotes: (state, action) => {
            state.notes = action.payload;
            state.messageSave = '';
        },
        
        setSaving: (state) => {
            state.isSaving = true
        },

        updateNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map( note => {
                   
                if( note.id === action.payload.id ){
                    return action.payload
                }
                return note 
            })

            state.messageSave = `${ action.payload.title}, ha sido actualizado correctamente`;
        },

        setPhotosToActiveNote : (state, action) => {
            state.activeNote.imageURLs = [...state.activeNote.imageURLs, ...action.payload];
            state.isSaving = false;
        },

        clearNotesData: (state) => {
            state.isSaving = false;
            state.messageSave = '';
            state.notes = [];
            state.activeNote = null;
        },
        
        deleteNoteById: (state, action) => {
            state.activeNote = null;
            state.notes = state.notes.filter( note => {
                note.id !== action.payload
            })
        },
    },
});

export const { 

    addNewEmptyNote,
    clearNotesData,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,

} = journalSlice.actions