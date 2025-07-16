import React, { useState, useRef, useEffect } from 'react';
import {
  Settings,
  Star,
  HelpCircle,
  LogOut,
  Pencil,
} from 'lucide-react';

import ProfilePage from '../../pages/ProfilePage';
import Modal from '../PopupModel/Model';
import { auth } from '../../firebase';
import { getDatabase, ref, onValue } from "firebase/database";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);

        // Check if profile image is stored in Realtime DB
         const db = getDatabase();
         const userRef = ref(db, `users/${user.uid}`);
         onValue(userRef, (snapshot) => {
          const data = snapshot.val();
        console.log(data,"userdata")
        if (data?.profileImage && data?.fullName) {
            setUserName(data.fullName);
            setUserImage(data.profileImage);
          } else {
            setUserImage(user.photoURL); // fallback
          }
        });
      }
    });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      unsubscribe();
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="profile flex items-center gap-2 focus:outline-none"
        id="user-menu"
        aria-label="User menu"
        onClick={toggleDropdown}
      >
        <img
          src={userImage || "/default-avatar.png"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-indigo-100 hover:shadow-2xl hover:shadow-indigo-700 object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-bold">{userName}</p>
            <p className="text-sm text-gray-600">{userEmail}</p>
          </div>

          <div
            className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
            onClick={() => setShowModal(true)}
          >
            <Pencil size={16} className="mr-2 text-gray-600" />
            Edit profile
          </div>
          <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
            <Settings size={16} className="mr-2 text-gray-600" />
            Preferences
          </div>

          <div className="border-t border-gray-100 my-1"></div>

          <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
            <Star size={16} className="mr-2 text-yellow-500" />
            Go Pro
          </div>
          <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
            <HelpCircle size={16} className="mr-2 text-gray-600" />
            Help center
          </div>
          <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 mb-2">
            <LogOut size={16} className="mr-2 text-gray-600" />
            Sign out
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ProfilePage onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default UserDropdown;
