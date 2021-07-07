import firebase from "firebase";
const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyD7xG9TMKuwdzHndFKG5g1L1BFtcmnpCoA",
    authDomain: "todo-app-bf9e4.firebaseapp.com",
    projectId: "todo-app-bf9e4",
    storageBucket: "todo-app-bf9e4.appspot.com",
    messagingSenderId: "803617641543",
    appId: "1:803617641543:web:31b3b94abda925faabcd62",
    measurementId: "G-BEJ6NKKX5K"
});
const db = firebaseApp.firestore();

export default db;