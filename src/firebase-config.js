// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe6qeOZ0AWe6fLEm0knwLcioQ7dSnLups",
  authDomain: "fixer-bot-195c4.firebaseapp.com",
  projectId: "fixer-bot-195c4",
  storageBucket: "fixer-bot-195c4.firebasestorage.app",
  messagingSenderId: "785954193018",
  appId: "1:785954193018:web:8de159dddbd779c8ca85c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);