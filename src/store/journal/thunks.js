import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./";


export const startNewNote = () => {

    return async(dispatch, getState) => { 

        
        dispatch( savingNewNote() )
        
        const { uid } = getState().auth;
      
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageURLs: []
        }
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) )
        await setDoc( newDoc, newNote );
        
        newNote.id = newDoc.id
        
        //Dispatch
        dispatch( addNewEmptyNote( newNote ));
        dispatch( setActiveNote( newNote ));
    } 
}

export const startLoadingNewNote = () => {
    return async(dispatch, getState) => {
    
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe'); 

        const load = await loadNotes( uid );

        dispatch( setNotes(load) )
    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const changeDataToFirebase = { ...activeNote };
        delete changeDataToFirebase.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`);
        await setDoc( docRef, changeDataToFirebase, {merge: true});

        dispatch( updateNote( activeNote ));

        const load = await loadNotes( uid );

        dispatch( setNotes(load) )
    }
}


export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        // await fileUpload( files[0] )

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ));    
        }
        // console.log( fileUploadPromises );

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ) )
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById( activeNote.id ));

        const load = await loadNotes( uid );
        dispatch( setNotes(load) )
    }
}
