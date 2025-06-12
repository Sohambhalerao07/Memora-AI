// components/SocialLogin.jsx
import React from "react";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { facebookProvider, googleProvider } from "../../firebase";

const SocialLogin = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // You can access user info using result.user
      console.log("Google Sign-In Success:", result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook Sign-In Success:", result.user);
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
    }
  };

  return (
    <div className="w-full max-w-[480px] px-4">
      <p className="text-center text-sm text-[#6B6B6B]">Or signup with</p>
      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={handleGoogleSignIn}
          className="w-full h-10 bg-[#EEEEEE] text-black font-bold rounded-xl"
        >
          Continue with Google
        </button>
        <button
          onClick={handleFacebookSignIn}
          className="w-full h-10 bg-[#EEEEEE] text-indigo-700 font-bold rounded-xl"
        >
          Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
