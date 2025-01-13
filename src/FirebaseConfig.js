// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvSA3Py9kkoR6ri1c0igiWWchQm-xy7Ic",
  authDomain: "medical-emr.firebaseapp.com",
  projectId: "medical-emr",
  storageBucket: "medical-emr.firebasestorage.app",
  messagingSenderId: "16289880389",
  appId: "1:16289880389:web:d764b27b6740885563462c",
  measurementId: "G-SDLSN6X8TT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);

export {app, database};