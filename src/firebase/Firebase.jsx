// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBTFeiMtsLyxNMoyKQ0w6s3pcPai-m58sA",
  authDomain: "auth-2ffbb.firebaseapp.com",
  projectId: "auth-2ffbb",
  storageBucket: "auth-2ffbb.appspot.com",
  messagingSenderId: "848763348615",
  appId: "1:848763348615:web:4694f119881332b9f5ba22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireDb = getFirestore(app);

