// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHc_MFYqeb6rbyIgfbQaH5WTp1wbioIXQ",
  authDomain: "hotel-app-645fc.firebaseapp.com",
  projectId: "hotel-app-645fc",
  storageBucket: "hotel-app-645fc.appspot.com",
  messagingSenderId: "1082515398763",
  appId: "1:1082515398763:web:fd55722f538b84ce46912e",
  measurementId: "G-6J3BYZJSK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, firestore, analytics};
