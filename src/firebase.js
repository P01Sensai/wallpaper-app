
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDeRiht6TuDGoZz7TxIUHIC6L4_2iRZBzY",
  authDomain: "wallpaperhub-605ce.firebaseapp.com",
  projectId: "wallpaperhub-605ce",
  storageBucket: "wallpaperhub-605ce.firebasestorage.app",
  messagingSenderId: "518589269268",
  appId: "1:518589269268:web:42acfef97220b08dc6ae01",
  measurementId: "G-9FK4338R44"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);