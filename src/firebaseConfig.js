// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUD6RBw7qx7QkSUHbq6SlAUkla8IcuCDc",
  authDomain: "fitness-lifestyle-6c137.firebaseapp.com",
  projectId: "fitness-lifestyle-6c137",
  storageBucket: "fitness-lifestyle-6c137.appspot.com", // ✅ Fixed storageBucket
  messagingSenderId: "117669229799",
  appId: "1:117669229799:web:aaab5adde26be8e1fede42",
  measurementId: "G-LF5H88NKV5"
};

// ✅ Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// ✅ Ensure exports are correct
export { app, auth, db, storage, analytics };
