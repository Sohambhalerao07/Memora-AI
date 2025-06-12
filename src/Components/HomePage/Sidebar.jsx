import React from 'react';
import { 
  HomeIcon, 
  PhotoIcon, 
  UserGroupIcon, 
  ShareIcon, 
  CogIcon,
  PlusIcon,
  ArrowUpTrayIcon,     // Replaces UploadIcon (correct name)
  UserPlusIcon,        // Replaces UserAddIcon
  QuestionMarkCircleIcon,
  BoltIcon             // Valid icon
} from '@heroicons/react/24/outline';
import CreateGalleryPage from '../../pages/CreateGalleryPage';
import { useState } from 'react';
import Modal from '../PopupModel/Model';

const Sidebar = () => {
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  return (
    <aside className="hidden md:flex md:flex-col w-64 h-screen bg-white border-r border-gray-200 px-4 py-6">
      {/* Main Navigation */}
      <nav className=" space-y-1 mb-8">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Navigation
        </h3>
        
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
          <HomeIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <span className="ml-3">Home</span>
        </a>
        
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
          <PhotoIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <button className="ml-3">My Photos</button>
        </a>
        
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
          <UserGroupIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <span className="ml-3">Groups</span>
        </a>
        
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
          <ShareIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <span className="ml-3">Shared Albums</span>
        </a>
        
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
          <CogIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <span className="ml-3">Settings</span>
        </a>
      </nav>

      {/* Quick Actions */}
      <div className="">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Quick Actions
        </h3>
        
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group"
        onClick={() => setShowModal(true)}>
          <PlusIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <span className="ml-3">Create Gallary</span>
        </button>
        
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
          <ArrowUpTrayIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <span className="ml-3">Upload Photos</span>
        </button>
        
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
          <UserPlusIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <span className="ml-3">Invite Members</span>
        </button>
      </div>

      {/* Help & Resources */}
      <div className="mt-8">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Help & Resources
        </h3>
        
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
          <QuestionMarkCircleIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <span className="ml-3">Helpful Tips</span>
        </a>
        
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
          <BoltIcon className="flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-indigo-600" />
          <span className="ml-3">Getting Started</span>
        </a>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <p className="px-3 text-xs text-gray-500">
          Made with <span className="text-indigo-600">Memora AI</span>
        </p>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <CreateGalleryPage />
</Modal>

    </aside>
  );
};

export default Sidebar;
