// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs0dKJI2RPdNZI1T30z-4IOZ-w7sWjnUU",
  authDomain: "memora-ai-94fd2.firebaseapp.com",
  projectId: "memora-ai-94fd2",
  storageBucket: "memora-ai-94fd2.firebasestorage.app",
  messagingSenderId: "408396756487",
  appId: "1:408396756487:web:fceba4ca6e876d61ecdca2",
  measurementId: "G-4DWTLLY1WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider= new GoogleAuthProvider(app)
const facebookProvider=new FacebookAuthProvider(app)
const analytics = getAnalytics(app);

export {auth,analytics,facebookProvider,googleProvider}