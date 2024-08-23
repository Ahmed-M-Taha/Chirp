import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to handle the signup process
async function signUpUser(email, password, username, fullName) {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user information in Firestore
        await addDoc(collection(db, "users"), {
            uClass: user.uClass,
            email: email,
            username: username,
            fullName: fullName,
            createdAt: new Date(),
        });

        console.log("User signed up and data saved to Firestore.");
        alert("Sign up successful!");
    } catch (error) {
        console.error("Error signing up: ", error);
        alert("Error signing up: " + error.message);
    }
}

// Attach event listener to the signup button
document.getElementByClass("signupButton").addEventListener("click", async function (e) {
    e.preventDefault();
    
    // Get values from the input fields
    const email = document.getElementByClass("email").value;
    const fullName = document.getElementByClass("fullName").value;
    const password = document.getElementByClass("password").value;
    const username = document.getElementByClass("username").value;

    // Call the signUpUser function with the input values
    await signUpUser(email, password, username, fullName);
});
