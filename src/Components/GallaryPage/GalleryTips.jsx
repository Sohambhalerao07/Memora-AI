// components/GalleryTips.jsx
import React from 'react';
import logo from '../../assets/logo.svg';

export default function GalleryTips() {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl text-sm text-gray-700 space-y-2">
      <div className='flex'>
        <img src={logo} alt="Logo" className="w-5 h-5 mb-2 mr-2" />
      <h2 className="font-semibold text-gray-900 mb-2">Gallery Creation Tips</h2>
      </div>
      <ul className="list-disc pl-4 space-y-1">
        <li>Choose a descriptive name for easy searching later.</li>
        <li>Accurate event dates help with chronological sorting.</li>
        <li>A detailed description makes your memories richer.</li>
        <li>Upload high-resolution photos for the best quality.</li>
        <li>You can always add more photos later!</li>
        <li>Consider adding tags in the next step for better organization.</li>
      </ul>
    </div>
  );
}
