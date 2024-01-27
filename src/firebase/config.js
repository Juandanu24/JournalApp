// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaOK0DPp0yqFJrsQNvR-EwPCBXzpfaL8E",
  authDomain: "journalapp-react-6627f.firebaseapp.com",
  projectId: "journalapp-react-6627f",
  storageBucket: "journalapp-react-6627f.appspot.com",
  messagingSenderId: "720894931521",
  appId: "1:720894931521:web:541a55987bc620054f8cc0"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
