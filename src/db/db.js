import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDlWUtlh-FBRjCvHkjJNN5mnoyFQ-IL-Tk",
    authDomain: "velocity-wear-7cbeb.firebaseapp.com",
    projectId: "velocity-wear-7cbeb",
    storageBucket: "velocity-wear-7cbeb.appspot.com",
    messagingSenderId: "248505959066",
    appId: "1:248505959066:web:01acff786562bc9ba21523"
};

initializeApp(firebaseConfig);

const db = getFirestore()

export default db