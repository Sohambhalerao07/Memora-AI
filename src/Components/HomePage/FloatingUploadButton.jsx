import React from 'react';

const FloatingUploadButton = () => (
  <button className="fixed bottom-7 right-7 z-40 bg-black hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-400 rounded-full flex items-center px-5 py-3 font-semibold text-base gap-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-300">
    <span className="text-xl font-bold">+</span>
    <span className="hidden sm:inline">Upload Photo</span>
  </button>
);

export default FloatingUploadButton;