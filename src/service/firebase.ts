import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
    // Add your Firebase configuration here
    apiKey: "AIzaSyC0m-3rojKkJRCTsUgLFnujKNzXDi0eVwc",
    authDomain: "affi-86ea9.firebaseapp.com",
    projectId: "affi-86ea9",
    storageBucket: "affi-86ea9.appspot.com",
    messagingSenderId: "988546629610",
    appId: "1:988546629610:web:8486daf52f3b53a6e27c93",
    measurementId: "G-S0F677RK44",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);