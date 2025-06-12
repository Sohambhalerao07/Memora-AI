import React from 'react';

const SearchBar = () => (
  <div className="pt-3 pb-2 flex items-center justify-center">
    <div className="w-full max-w-lg relative">
      <input 
        type="search" 
        placeholder="🔎 Search by people, event, place, tag..." 
        className="w-full pl-4 pr-12 py-2 rounded-lg bg-gray-100 focus:bg-white border border-gray-200 focus:border-indigo-400 outline-none shadow-sm text-base transition" 
      />
      <span className="absolute right-3 top-2.5 text-indigo-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7"/>
          <path d="M21 21L16.65 16.65"/>
        </svg>
      </span>
    </div>
  </div>
);

export default SearchBar;