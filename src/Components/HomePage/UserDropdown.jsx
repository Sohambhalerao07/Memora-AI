import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Settings,
  Star,
  HelpCircle,
  LogOut,
  Pencil,
} from 'lucide-react';

import ProfilePage from '../../pages/ProfilePage';
import Modal from '../PopupModel/Model';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
         className="profile flex items-center gap-2 focus:outline-none " id="user-menu" aria-label="User menu"
        onClick={toggleDropdown}
      >
        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-100 hover:shadow-2xl hover:shadow-indigo-700 object-cover" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
  {/* Header */}
  <div className="px-4 py-3 border-b border-gray-100">
    <p className="font-bold">User name</p>
    <p className="text-sm text-gray-600">example@gmail.com</p>
  </div>

  {/* Items */}
  <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
   onClick={()=> setShowModal(true)}>
    <Pencil size={16} className="mr-2 text-gray-600" />
    Edit profile
  </div>
  <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
    <Settings size={16} className="mr-2 text-gray-600" />
    Preferences
  </div>

  {/* Divider */}
  <div className="border-t border-gray-100 my-1"></div>

  <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
    <Star size={16} className="mr-2 text-yellow-500" />
    Go Pro
  </div>
  <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
    <HelpCircle size={16} className="mr-2 text-gray-600" />
    Help center
  </div>
  <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
    <LogOut size={16} className="mr-2 text-gray-600" />
    Sign out
  </div>

  {/* Footer */}
  <div className="px-4 py-3 text-xs text-center text-gray-500 border-t border-gray-100">
    Made with <strong>visily</strong>
  </div>
</div>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <ProfilePage onClose={() => setShowModal(false)} /></Modal>
    </div>
  );
};

export default UserDropdown;
    