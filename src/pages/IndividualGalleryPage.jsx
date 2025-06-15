import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, Grid3X3 } from 'lucide-react';
import Selection from "../assets/Selection.png"
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <img
      src={Selection}
      alt="Empty Folder"
      className="w-32 h-32 mb-4"
    />
    <h2 className="text-lg font-semibold">Insert Images</h2>
    <p className="text-sm text-gray-500">or Drag and Drop here</p>
  </div>
);

export default function IndividualGalleryPage({ onClose }) {
  const [tab, setTab] = useState('photos');
  const [photos, setPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white px-6 py-4 mt-20 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gallery Name</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-purple-700"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} /> Add Images
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex gap-4 border-b border-gray-200">
          {['photos', 'folders', 'drafts'].map((val) => (
            <button
              key={val}
              onClick={() => setTab(val)}
              className={`px-4 py-2 ${tab === val ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}
            >
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-8 py-2 text-sm"
            />
          </div>
          <button className="border rounded p-2">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">Total {photos.length} photos</p>
        <div className="relative inline-block">
          <button className="flex items-center border rounded px-4 py-2 text-sm gap-2">
            <Grid3X3 size={16} /> Sort by: Date <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      {photos.length === 0 ? <EmptyState /> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-sm">
              <img src={photo.url} alt={photo.alt} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
            <input type="file" className="mb-4" />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
