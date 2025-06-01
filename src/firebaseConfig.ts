// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// !!! IMPORTANT: Replace this with your actual Firebase project configuration from the Firebase Console !!!
const firebaseConfig = {
  apiKey: "AIzaSyDTUeZjRRsaCNX4kSXPaa9ee642f43zJ54",
  authDomain: "snap-learn-128f4.firebaseapp.com",
  projectId: "snap-learn-128f4",
  storageBucket: "snap-learn-128f4.firebasestorage.app",
  messagingSenderId: "771224176267",
  appId: "1:771224176267:web:fa2597ca807ef68105b68e",
  measurementId: "G-TERBVW1H15" // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Auth instance
export const auth = getAuth(app);