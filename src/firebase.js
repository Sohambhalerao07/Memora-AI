// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs0dKJI2RPdNZI1T30z-4IOZ-w7sWjnUU",
  authDomain: "memora-ai-94fd2.firebaseapp.com",
  databaseURL: "https://memora-ai-94fd2-default-rtdb.firebaseio.com",
  projectId: "memora-ai-94fd2",
  storageBucket: "memora-ai-94fd2.firebasestorage.app",
  messagingSenderId: "408396756487",
  appId: "1:408396756487:web:fceba4ca6e876d61ecdca2",
  measurementId: "G-4DWTLLY1WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, analytics, facebookProvider, googleProvider };