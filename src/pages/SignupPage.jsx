import React from "react";
import Header from "../Components/LoginPage/Header";
import HeroSection from "../Components/LoginPage/HeroSection";
import SignupForm from "../Components/SignupPage/SignupForm";
import SocialLogin from "../Components/SignupPage/SocioLogin";

const SignupPage = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <Header />
      <div className="flex flex-1">
        {/* Left Side – Hero or image */}
        <div className="  md:flex items-center">
          <HeroSection />
        </div>

        {/* Right Side – Signup form */}
        <div className="md:w-1/3  items-center justify-center mx-3.5 px-6 py-12">
          <SignupForm />
          <SocialLogin/>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
