import firebase from 'firebase';
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBNB2OYOwlNtiDQRn0-fP9g8pk6aJBDpWw",
    authDomain: "barbearia-reactnative.firebaseapp.com",
    projectId: "barbearia-reactnative",
    storageBucket: "barbearia-reactnative.appspot.com",
    messagingSenderId: "746863345314",
    appId: "1:746863345314:web:a93cf5794827bfe45fa1fb"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
export default database