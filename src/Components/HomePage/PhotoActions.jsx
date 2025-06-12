import React from 'react';

const PhotoActions = () => (
  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
    <button className="bg-white text-indigo-600 rounded-full p-2 shadow hover:bg-indigo-50" title="Share">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7"/>
        <path d="M16 6l-4-4-4 4M12 2v14"/>
      </svg>
    </button>
    <button className="bg-white text-indigo-600 rounded-full p-2 shadow hover:bg-indigo-50" title="Download">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 5v14M19 12l-7 7-7-7"/>
      </svg>
    </button>
    <button className="bg-white text-red-500 rounded-full p-2 shadow hover:bg-red-50" title="Delete">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
);

export default PhotoActions;