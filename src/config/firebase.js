// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
