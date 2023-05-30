import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAJ8o0Jvzd3laIiU72vnd-B319z7ubcxvQ",
    authDomain: "chat-dfa82.firebaseapp.com",
    projectId: "chat-dfa82",
    storageBucket: "chat-dfa82.appspot.com",
    messagingSenderId: "691813603292",
    appId: "1:691813603292:web:9e5a6f17ff0c3511b9a119",
    measurementId: "G-30DBNEJ25B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);


