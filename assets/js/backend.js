import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, deleteDoc, addDoc, doc, query, orderBy } from 'firebase/firestore/lite';
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const fetchPosts = async () => {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('createdAt', 'desc'));
    const postSnapshot = await getDocs(q);
    const postList = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return postList;
};

export const createPost = async (title, content, uid) => {
    const postsCollection = collection(db, 'posts');
    const docRef = await addDoc(postsCollection, {
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
