import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCErgcAXP33c2QOv1AnuGOSoZqjgcXAB8U",
  authDomain: "woc1-d897c.firebaseapp.com",
  projectId: "woc1-d897c",
  storageBucket: "woc1-d897c.appspot.com",
  messagingSenderId: "627562465480",
  appId: "1:627562465480:web:5b187404c739415fb67dfd",
  measurementId: "G-3RRCTPD7DV",
};

const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
