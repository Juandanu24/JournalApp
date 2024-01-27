import { loginWithEmailPassword, logoutFirebase, registerUserEmailAndPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesData } from "../journal/journalSlice";
import { checkingCredentials, logout, login } from "./";

export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {

        dispatch(checkingCredentials());
    }
}


export const startGoogleSingIn = () => {
    return async( dispatch ) => {

        dispatch(checkingCredentials());

        const result =  await signInWithGoogle();

        if (!result.ok)  return dispatch( logout( result.errorMessage ))

        dispatch( login( result ))
        
    }
}


export const startCreatingUserEmailPassword = ({email, password, displayName}) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserEmailAndPassword({email, password, displayName});
 
        if(!ok) return dispatch( logout({ errorMessage }));

        dispatch( login({ displayName, uid, photoURL, email }))
    }
}


export const startLoginEmailPassword = ({email, password}) => {

    return async ( dispatch ) => {

        dispatch ( checkingCredentials() );

        const {ok, uid, photoURL, errorMessage, displayName} = await loginWithEmailPassword({email, password});
        
        
        if(!ok) return dispatch( logout({ errorMessage }));

        dispatch( login({ uid, photoURL, email, displayName}))

    }
}


export const startLogout = () => {

    return async( dispatch ) => {

        await logoutFirebase();

        dispatch( clearNotesData() );
        dispatch( logout() );
    }
}