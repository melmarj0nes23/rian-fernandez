import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmv_qd7XRaHMU3hiiblsXFqjzKsCAjiKk",
  authDomain: "rian-fernandez.firebaseapp.com",
  projectId: "rian-fernandez",
  storageBucket: "rian-fernandez.firebasestorage.app",
  messagingSenderId: "191655404346",
  appId: "1:191655404346:web:b26d51e9d0fab5829fa603",
  measurementId: "G-EHG2PC8KQD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
