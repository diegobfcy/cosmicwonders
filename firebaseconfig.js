// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWMgLrmJoUncKUV_QL4fGK94mndJBj0WM",
  authDomain: "cosmicwonders-5a958.firebaseapp.com",
  projectId: "cosmicwonders-5a958",
  storageBucket: "cosmicwonders-5a958.appspot.com",
  messagingSenderId: "756648891765",
  appId: "1:756648891765:web:cd519f1b1546e457b82f3c",
  measurementId: "G-PY68V7YQH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);