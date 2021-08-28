import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
const fire = firebase.initializeApp({
    apiKey: "AIzaSyDu9pqNK1SO3pwtddtOIYESsnIHY11bkUk",
    authDomain: "fir-authapp-a3b81.firebaseapp.com",
    projectId: "fir-authapp-a3b81",
    storageBucket: "fir-authapp-a3b81.appspot.com",
    messagingSenderId: "822316303134",
    appId: "1:822316303134:web:545308a46e716010793f0f"
});
export const auth = fire.auth();
export const db = fire.firestore();
export const storage = fire.storage();
export default {
  fire,
};