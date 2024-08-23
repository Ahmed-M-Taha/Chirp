// Import the functions you need from the SDKs you need
let firebase = require('firebase/app');
let analytics_fb = require('firebase/analytics');
let firestore = require('firebase/firestore/lite');
let authen = require('firebase/auth');

// Your web app's Firebase configuration
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
const app = firebase.initializeApp(firebaseConfig);
const auth = authen.getAuth(app);
const analytics = analytics_fb.getAnalytics(app);

let signInBtn = document.getElementById("signInBtn");

signInBtn.onclick = signInUser();

// Function to handle the sign-in process
async function signInUser(email, password) {
    try {
        // Sign in with email and password
        const userCredential = await authen.signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User signed in:", user);
        alert("Sign in successful!");
        console.log(email, password);
    } catch (error) {
        console.error("Error signing in: ", error);
        alert("Error signing in: " + error.message);

    }
}

// Attach event listener to the sign-in button
document.querySelector(".signinButton").addEventListener("click", async function (e) {
    e.preventDefault();
    
    // Get values from the input fields
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;

    // Call the signInUser function with the input values
    await signInUser(email, password);
});
