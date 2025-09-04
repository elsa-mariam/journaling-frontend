// Import Firebase core
import { initializeApp } from "firebase/app";
// Import Firestore (for database)
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjPfLkKIf-Dt0GHRGhTcwjTJIfxFAeiTg", 
  authDomain: "ai-journaling-app-grp4.firebaseapp.com",
  projectId: "ai-journaling-app-grp4",
  storageBucket: "ai-journaling-app-grp4.appspot.com", // fixed bucket name
  messagingSenderId: "399142492384",
  appId: "1:399142492384:web:c74b3100655f6218051885",
  measurementId: "G-T5FTB40PNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

export { db };
