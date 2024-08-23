import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, deleteField, query } from 'firebase/firestore/lite';
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

async function getContent(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }