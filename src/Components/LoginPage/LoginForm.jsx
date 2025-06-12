import React, { useState } from "react";
import { auth } from "../../firebase"; // adjust path as needed
import { signInWithEmailAndPassword } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "../../pages/HomePage";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home')
      // Redirect or update UI on success
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-black text-2xl font-bold text-center mt-6">Log in</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-[480px] px-4">
        <label className="block mb-4">
          <p className="text-black text-base font-medium pb-2">Email</p>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-14 p-4 rounded-xl border border-[#DEDEDE] placeholder-[#6B6B6B] bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <p className="text-black text-base font-medium pb-2">Password</p>
          <input
            type="password"
            placeholder="Password"
            className="w-full h-14 p-4 rounded-xl border border-[#DEDEDE] placeholder-[#6B6B6B] bg-white text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-black hover:bg-gray-900 text-white font-bold rounded-xl mb-4"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
