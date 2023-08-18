// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIpPmcv-knYZ8uOdgZ_7qMWoRBcc5KX9Q",
  authDomain: "social-media-app-61752.firebaseapp.com",
  projectId: "social-media-app-61752",
  storageBucket: "social-media-app-61752.appspot.com",
  messagingSenderId: "1093271564778",
  appId: "1:1093271564778:web:1f0581966da9c333004293"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);