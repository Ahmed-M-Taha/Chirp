import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle the sign-in process
async function signInUser(email, password) {
    try {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User signed in:", user);
        alert("Sign in successful!");
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