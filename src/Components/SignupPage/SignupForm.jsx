import React, { useState } from "react";
import { auth } from "../../firebase"; // adjust path
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Save full name to Firebase user profile
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Redirect or show success message
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-[480px] px-4">

        <label className="block mb-4">
          <p className="text-black text-base font-medium pb-2">Full Name</p>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full h-14 p-4 rounded-xl border border-[#DEDEDE] placeholder-[#6B6B6B] bg-white text-black"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>

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

        <label className="block mb-4">
          <p className="text-black text-base font-medium pb-2">Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full h-14 p-4 rounded-xl border border-[#DEDEDE] placeholder-[#6B6B6B] bg-white text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-black hover:bg-gray-900 text-white font-bold rounded-xl mb-4"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </>
  );
};

export default SignupForm;
