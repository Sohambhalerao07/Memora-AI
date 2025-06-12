// components/Navbar.jsx
import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
  {/* Left Side: Logo + Links */}
  <div className="flex items-center gap-10">
    {/* Logo */}
    <div className="flex items-center gap-3 text-xl font-bold text-gray-900">
      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full">
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 4C25.78 14.21 33.78 22.21 44 24C33.78 25.78 25.78 33.78 24 44C22.21 33.78 14.21 25.78 4 24C14.21 22.21 22.21 14.21 24 4Z" fill="currentColor" />
        </svg>
      </span>
      <span className="text-lg font-bold font-jakarta tracking-tight">Memora AI</span>
    </div>

    {/* Nav Links */}
    <div className="hidden md:flex space-x-6 text-gray-700">
      <a href="#" className="hover:text-indigo-600">Home</a>
      <a href="#" className="hover:text-indigo-600">Galleries</a>
      <a href="#" className="hover:text-indigo-600">Profile</a>
    </div>
  </div>

  {/* Right Side: Search + User */}
  <div className="flex items-center gap-6">
    {/* Search */}
    <div className="hidden md:block">
      <input
        type="text"
        placeholder="Search galleries..."
        className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      />
    </div>

    {/* User Profile */}
    <div className="relative">
      <button className="flex items-center gap-2 focus:outline-none" id="user-menu" aria-label="User menu">
        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-100 shadow-sm object-cover" />
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Dropdown */}
      <div className="hidden absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg border border-gray-100 py-2">
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</a>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Settings</a>
        <div className="border-t my-1"></div>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Logout</a>
      </div>
    </div>
  </div>
</nav>

  );
}