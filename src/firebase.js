import {initializeApp} from "firebase/app"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import firebase from "firebase/compat";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABSE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}


const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const register = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword( email, password).then((userCredential) => {
        const userek = userCredential.user
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code = " + errorCode);
        console.log("error message = " + errorMessage);
    })
}

export const login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        const userek = userCredential.user
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code = " + errorCode);
        console.log("error message = " + errorMessage);
    })
}
export const logout = () => { firebase.auth().signOut().then(() =>{
    console.log("Wylogowano poprawnie")
}).catch((err) =>{
    console.log(err);
})
}



