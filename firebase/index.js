// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjoPIRG6i3-eI7W9YFuXickVTk552GuHw",
  authDomain: "englishlearning-21a2d.firebaseapp.com",
  databaseURL: "https://englishlearning-21a2d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "englishlearning-21a2d",
  storageBucket: "englishlearning-21a2d.appspot.com",
  messagingSenderId: "29748544211",
  appId: "1:29748544211:web:192618e1d880d26ea58a26",
  measurementId: "G-GFQMF3YHEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);