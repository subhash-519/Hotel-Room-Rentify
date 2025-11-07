// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA4yKtczxNlbp0NdJYi89pSPYG0kUCmXqo",
    authDomain: "rentify-50bdb.firebaseapp.com",
    projectId: "rentify-50bdb",
    storageBucket: "rentify-50bdb.appspot.com",
    messagingSenderId: "816789151891",
    appId: "1:816789151891:web:74f5c46b94f3c5e8006d66",
    measurementId: "G-6R3V58S03Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage, analytics };
