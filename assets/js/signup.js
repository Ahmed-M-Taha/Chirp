// Import the functions you need from the SDKs you need
let crypto = window.crypto || window.msCrypto; // For cross-browser compatibility
let firebase = require('firebase/app');
let analytics_fb = require('firebase/analytics');
let firestore = require('firebase/firestore/lite');
let auth_fb = require('firebase/auth');

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

// Initialize Firebaseconst app = initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);
const auth = auth_fb.getAuth(app);
const analytics = analytics_fb.getAnalytics(app);

let signUpBtn = document.getElementById("signUpBtn");

// signUpBtn.onclick = signUpUser();

// Function to handle the sign-in process
// async function signInUser(email, password) {
//     try {
//         // Sign in with email and password
//         const userCredential = await auth_fb.signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         console.log("User signed in:", user);
//         alert("Sign in successful!");
//         console.log(email, password);
//     } catch (error) {
//         console.error("Error signing in: ", error);
//         alert("Error signing in: " + error.message);

//     }
// }

// Convert a string to an ArrayBuffer
function stringToArrayBuffer(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str).buffer;
}

// Convert an ArrayBuffer to a string
function arrayBufferToString(buffer) {
    const decoder = new TextDecoder();
    return decoder.decode(buffer);
}

// Generate a random key for AES-256 encryption
export async function generateKey() {
    return crypto.subtle.generateKey(
        {
            name: 'AES-CBC',
            length: 256,
        },
        true,
        ['encrypt', 'decrypt']
    );
}

// Encrypt text with AES-256 using the Web Crypto API
export async function encrypt(text, key) {
    const iv = crypto.getRandomValues(new Uint8Array(16)); // Generate a random IV
    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: 'AES-CBC',
            iv: iv,
        },
        key,
        stringToArrayBuffer(text)
    );

    // Return IV + encrypted data as base64 string
    const ivBase64 = btoa(String.fromCharCode(...iv));
    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
    return `${ivBase64}:${encryptedBase64}`;
}

// Decrypt text with AES-256 using the Web Crypto API
// export async function decrypt(encryptedText, key) {
//     const [ivBase64, encryptedBase64] = encryptedText.split(':');
//     const iv = new Uint8Array(atob(ivBase64).split('').map(char => char.charCodeAt(0)));
//     const encryptedBuffer = new Uint8Array(atob(encryptedBase64).split('').map(char => char.charCodeAt(0)));

//     const decryptedBuffer = await crypto.subtle.decrypt(
//         {
//             name: 'AES-CBC',
//             iv: iv,
//         },
//         key,
//         encryptedBuffer
//     );

//     return arrayBufferToString(decryptedBuffer);
// }

async function signUpUser(email, username, displayName, password) {
    const usersCollection = firestore.collection(db, 'users');
    const docRef = await firestore.addDoc(usersCollection, {
        email: email,
        username: username,
        displayName: displayName,
        password: password,
        timestamp: new Date(),
    });
    return docRef.id;
    // await addDoc(collection(db, "users"), {
    //     email: email,
    //     username: username,
    //     fullName: fullName,
    //     createdAt: new Date(),
    // });
};

// Attach event listener to the sign-in button
document.querySelector(".signUpButton").addEventListener("click", async function (e) {
    e.preventDefault();
    
    let email_input = document.querySelector(".email").value;
    let username_input = document.querySelector(".username").value;
    let displayName_input = document.querySelector(".displayName").value;
    let password_input = encrypt(document.querySelector(".username").value, 'omar');

    // Call functions and send parameters
    await signUpUser(email_input, username_input, displayName_input, password_input);
});
