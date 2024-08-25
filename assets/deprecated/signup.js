// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Function to handle the signup process
async function signUpUser(email, password, username, fullName) {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user information in Firestore
        await addDoc(collection(db, "users"), {
            email: email,
            username: username,
            fullName: fullName,
            createdAt: new Date(),
        });

        console.log("User signed up and data saved to Firestore.");
        alert("Sign up successful!");
        window.location.href = "index.html"; // Corrected assignment
    } catch (error) {
        console.error("Error signing up: ", error);
        alert("Error signing up: " + error.message);
    }
}

// Attach event listener to the signup button
document.querySelector(".signupButton").addEventListener("click", async function (e) {
    e.preventDefault();
    
    // Get values from the input fields
    const email = document.querySelector(".email").value;
    const fullName = document.querySelector(".fullName").value;
    const password = document.querySelector(".password").value;
    const username = document.querySelector(".username").value;

    // Call the signUpUser function with the input values
    await signUpUser(email, password, username, fullName);
});
