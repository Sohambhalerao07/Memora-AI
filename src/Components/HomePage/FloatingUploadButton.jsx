import React from 'react'
import Modal from '../PopupModel/Model';
import CreateGallery from '../../pages/CreateGalleryPage';
import { useState } from 'react';

function FloatingUploadButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button className="fixed bottom-7 right-7 z-40 bg-black hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-400 rounded-full flex items-center px-5 py-3 font-semibold text-base gap-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
      onClick={() => setShowModal(true)}>
    <span className="text-xl font-bold">+</span>
    <span className="hidden sm:inline">Create Gallery</span>
  </button>
   <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreateGallery onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  )
}

export default FloatingUploadButton
