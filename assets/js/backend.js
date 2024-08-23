// import { initializeApp } from "firebase/app";
// import "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, getDocs, deleteDoc, addDoc, doc, query, orderBy } from 'firebase/firestore/lite';

let firebase = require('firebase/app');
let analytics = require('firebase/analytics');
let firestore = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyCygZMWHgH3k9ovC-fe1fIPw2Sxw_pgaSw",
    authDomain: "chirp-73628.firebaseapp.com",
    projectId: "chirp-73628",
    storageBucket: "chirp-73628.appspot.com",
    messagingSenderId: "595021201665",
    appId: "1:595021201665:web:b744378dbb215aeb641b00",
    measurementId: "G-Q85L717F3Q"
      };

const app = firebase.initializeApp(firebaseConfig);
const analytics = analytics.getAnalytics(app);
const db = firestore.getFirestore(app);

export const fetchPosts = async () => {
    const postsCollection = firestore.collection(db, 'posts');
    const q = firestore.query(postsCollection, orderBy('createdAt', 'desc'));
    const postSnapshot = await firestore.getDocs(q);
    const postList = postSnapshot.docs.map(firestoreDoc => ({ id: firestoreDoc.id, ...firestoreDoc.data() }));
    return postList;
};

export const createPost = async (title, content, uid) => {
    const postsCollection = firestore.collection(db, 'posts');
    const docRef = await firestore.addDoc(postsCollection, {
        title,
        content,
        uid,
        createdAt: new Date(),
    });
    return docRef.id;
};

export const deletePost = async (postId) => {
    const postDoc = doc(db, 'posts', postId);
    await deleteDoc(postDoc);
    return `Post ${postId} deleted successfully`;
};

