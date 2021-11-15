import {initializeApp} from "firebase/app"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import firebase from "firebase/compat";
import { getStorage } from "firebase/storage";
import { Redirect, useHistory } from "react-router";


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
export const storage = firebase.storage();
export const db = app.firestore()
export const auth = getAuth(app);
export const register = (email, password, img) => {
    firebase.auth().createUserWithEmailAndPassword( email, password).then((userCredential) => {
        const userek = userCredential.user
        
        if (img != null){
        storage.ref(`images/${userek.uid}/${img.name}`).put(img).on('state_changed', 
        (snapshot) => {

        },
        (error) => {console.log(error);
        },
        () => {
            storage.ref(`images/${userek.uid}`).child(img.name).getDownloadURL().then(url =>{
                firebase.firestore().collection("users").doc(userek.uid).set({
                    email: userek.email,
                    uid: userek.uid,
                    url: url
                })

            })
        });
        }
        else{
        firebase.firestore().collection("users").doc(userek.uid).set({
            email: userek.email,
            uid: userek.uid
        })

    }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code = " + errorCode);
        console.log("error message = " + errorMessage);
    })
}

export const login = (email, password, setErrorStatus) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        
        const userek = userCredential.user
        setErrorStatus(null)
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code = " + errorCode);
        console.log("error message = " + errorMessage);
        setErrorStatus(errorCode);
    })
}
export const logout = () => { firebase.auth().signOut().then(() =>{
    console.log("Wylogowano poprawnie")
}).catch((err) =>{
    console.log(err);
})
}

export const getMessages = () => {
    return firebase.firestore().collection("messages")
}
export const getMessagesWithFriend = (myUid, friendUid) => {
    return firebase.firestore().collection(`${myUid}${friendUid}_messages`)
}
export const getUsers = () => {
    return firebase.firestore().collection("users")
}
export const getAnything = (col) => {
    return firebase.firestore().collection(col);
}
export const time = () =>{
    return firebase.firestore.FieldValue.serverTimestamp();
}


