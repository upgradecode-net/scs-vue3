import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD7zv2DVg78NUg60q96dhk2TA_g0Hlwha0",
  authDomain: "scs-web-69330.firebaseapp.com",
  projectId: "scs-web-69330",
  storageBucket: "scs-web-69330.appspot.com",
  messagingSenderId: "63449497973",
  appId: "1:63449497973:web:c9ce730b305dc80086533c",
  measurementId: "G-PJEW4PD01X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);