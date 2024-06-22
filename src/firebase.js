import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCo_1J8OdzilAKmj6VAGw01AV1a_zA22zQ",
  authDomain: "priyesh-portfolio.firebaseapp.com",
  projectId: "priyesh-portfolio",
  storageBucket: "priyesh-portfolio.appspot.com",
  messagingSenderId: "264733360372",
  appId: "1:264733360372:web:23ddaf53b2c7d64d921ea1"
};

export const app = initializeApp(firebaseConfig);

export const  db = getFirestore();