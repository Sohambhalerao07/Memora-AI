// pages/LoginPage.jsx
import React from "react";
import Header from "../Components/LoginPage/Header";
import HeroSection from "../Components/LoginPage/HeroSection";
import LoginForm from "../Components/LoginPage/LoginForm";
import SocioLogin from "../Components/LoginPage/SocioLogin";
import FooterLinks from "../Components/LoginPage/FooterLinks";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <Header />
      <div className="py-5 flex flex-row w-full px-10 md:px-40 gap-8">
        <div className="w-1/2">
          <HeroSection />
        </div>
        <div className="w-1/2">
          <LoginForm />
          <SocioLogin />
          <FooterLinks />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
