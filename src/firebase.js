import firebase from "firebase"


var config = {
    apiKey: "AIzaSyCt0IedyVg1WDokUfM_Kn8RJW923FRJs_8",
    authDomain: "board-ethereum.firebaseapp.com",
    databaseURL: "https://board-ethereum.firebaseio.com",
    projectId: "board-ethereum",
    storageBucket: "board-ethereum.appspot.com",
    messagingSenderId: "743641396459"
};
firebase.initializeApp(config);

export default firebase;