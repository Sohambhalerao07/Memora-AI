import React from 'react';
import logo from '../../assets/logo.svg';

function ProfileTips() {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl text-sm text-gray-700 space-y-2">
      <div className='flex items-center mb-2'>
        <img src={logo} alt="Logo" className="w-5 h-5 mr-2" />
        <h2 className="font-semibold text-gray-900">Profile Page Tips</h2>
      </div>
      <ul className="list-disc pl-4 space-y-1">
        <li>Upload a clear, front-facing profile photo for accurate face recognition.</li>
        <li>Use your real full name to maintain authenticity.</li>
        <li>Double-check your email and phone number for accuracy — they're important for verification.</li>
        <li>Click “Save profile” after making changes — don’t forget!</li>
      </ul>
    </div>
  );
}

export default ProfileTips;
