// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ethio-realsate.firebaseapp.com",
  projectId: "ethio-realsate",
  storageBucket: "ethio-realsate.appspot.com",
  messagingSenderId: "299132420340",
  appId: "1:299132420340:web:bec6e9834a2e88ef5a1ea1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);