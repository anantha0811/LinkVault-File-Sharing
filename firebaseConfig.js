// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW_EAMY3ynQghZ7zSdNp9t0L7glvHB_F0",
  authDomain: "sharing-app-bea71.firebaseapp.com",
  projectId: "sharing-app-bea71",
  storageBucket: "sharing-app-bea71.appspot.com",
  messagingSenderId: "868420872995",
  appId: "1:868420872995:web:11e1ff6e90a6caa5e1fa96",
  measurementId: "G-95QX10TN64",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
