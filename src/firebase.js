import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUD6RBw7qx7QkSUHbq6SlAUkla8IcuCDc",
    authDomain: "fitness-lifestyle-6c137.firebaseapp.com",
    projectId: "fitness-lifestyle-6c137",
    storageBucket: "fitness-lifestyle-6c137.firebasestorage.app",
    messagingSenderId: "117669229799",
    appId: "1:117669229799:web:aaab5adde26be8e1fede42",
    measurementId: "G-LF5H88NKV5"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
