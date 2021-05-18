import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDPzGKskOasSnpYCwmKJq6NDRkR9JbUNNU",
  authDomain: "moneyhater-e3629.firebaseapp.com",
  projectId: "moneyhater-e3629",
  storageBucket: "moneyhater-e3629.appspot.com",
  messagingSenderId: "1039307517943",
  appId: "1:1039307517943:web:504308abc6886df83088f2",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export const firestore = app.firestore();
export const storage = app.storage();
export const database = app.database();
