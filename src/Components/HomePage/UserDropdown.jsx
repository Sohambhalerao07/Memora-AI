import React from 'react';

const UserDropdown = () => (
  <div className="relative ml-4">
    <button className="profile flex items-center gap-2 focus:outline-none" id="user-menu" aria-label="User menu">
      <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-100 shadow-sm object-cover" />
      
    </button>
    <div className="hidden absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg border border-gray-100 py-2">
      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</a>
      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Settings</a>
      <div className="border-t my-1"></div>
      <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Logout</a>
    </div>
  </div>
);

export default UserDropdown;