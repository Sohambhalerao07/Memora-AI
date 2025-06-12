import React from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      // Redirect after login
      navigate("/home"); // or wherever your user should go
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  const handleFacebookLogin = () => {
    // Facebook login logic can go here (if needed)
    alert("Facebook login not implemented yet.");
  };

  return (
    <div className="w-full max-w-[480px] px-4">
      <p className="text-center text-sm text-[#6B6B6B]">Or login with</p>
      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={handleGoogleLogin}
          className="w-full h-10 bg-[#EEEEEE] text-black font-bold rounded-xl"
        >
          Continue with Google
        </button>
        <button
          onClick={handleFacebookLogin}
          className="w-full h-10 bg-[#EEEEEE] text-indigo-700 font-bold rounded-xl"
        >
          Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
