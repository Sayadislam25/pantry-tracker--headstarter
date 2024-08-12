// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3nLx8E5NhsRB-KBE_ocxhaCrtj_kIzpM",
  authDomain: "pantry-tracker-app-880f6.firebaseapp.com",
  projectId: "pantry-tracker-app-880f6",
  storageBucket: "pantry-tracker-app-880f6.appspot.com",
  messagingSenderId: "504176736176",
  appId: "1:504176736176:web:742ea76da483838765c875",
  measurementId: "G-WQ2TXKG3G4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export {firestore}