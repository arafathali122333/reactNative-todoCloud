import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRAd9tAk_3od1cJ-GGB1Ql747DezR7UUk",
  authDomain: "todocloud-7fafe.firebaseapp.com",
  projectId: "todocloud-7fafe",
  storageBucket: "todocloud-7fafe.appspot.com",
  messagingSenderId: "1032398977977",
  appId: "1:1032398977977:web:1ef42d3fd3ef35dd7d5468"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// firebase 9.6.11
export {
  db,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
};
