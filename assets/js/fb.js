// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCygZMWHgH3k9ovC-fe1fIPw2Sxw_pgaSw",
  authDomain: "chirp-73628.firebaseapp.com",
  projectId: "chirp-73628",
  storageBucket: "chirp-73628.appspot.com",
  messagingSenderId: "595021201665",
  appId: "1:595021201665:web:b744378dbb215aeb641b00",
  measurementId: "G-Q85L717F3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);