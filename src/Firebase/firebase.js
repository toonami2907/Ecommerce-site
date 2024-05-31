// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh4pWIB0N-_5Umjzn_lelJ_1Y_wkVU0SA",
  authDomain: "ecommerce-site-70b4c.firebaseapp.com",
  projectId: "ecommerce-site-70b4c",
  storageBucket: "ecommerce-site-70b4c.appspot.com",
  messagingSenderId: "248416937675",
  appId: "1:248416937675:web:1b9f82615d8248f8965d4e",
  measurementId: "G-0ZV9VK44PZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);