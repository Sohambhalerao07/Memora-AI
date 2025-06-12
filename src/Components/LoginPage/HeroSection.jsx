// components/HeroSection.jsx
import React from "react";

const HeroSection = () => (
  <div className="p-4">
    <div
      className="flex min-h-[480px] flex-col items-center justify-center gap-6 rounded-xl bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://cdn.usegalileo.ai/sdxl10/ef12f746-4997-43fe-be52-dd02e747c89d.png')",
      }}
    >
      <h1 className="text-white text-5xl font-black text-center">Welcome to Memora AI</h1>
      <h2 className="text-white text-base font-normal text-center">
        Share your travel experience with the world.
      </h2>
      <button className="h-12 px-5 bg-black text-white font-bold rounded-xl">Sign up</button>
    </div>
  </div>
);

export default HeroSection;
