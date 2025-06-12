// components/PhotoUpload.jsx
import React, { useRef } from 'react'; // Import useRef
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function PhotoUpload({ onFilesDrop }) {
  // Create a ref to access the hidden file input element.
  const fileInputRef = useRef(null);

  // handleDragOver prevents the default browser behavior for drag-and-drop.
  const handleDragOver = (e) => {
    e.preventDefault();
    // Optionally add a class for visual feedback when dragging over
    e.currentTarget.classList.add('border-indigo-500', 'bg-gray-700');
  };

  // handleDragLeave removes visual feedback when dragging leaves the area.
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-indigo-500', 'bg-gray-700');
  };

  // handleDrop captures dropped files and passes them to the onFilesDrop callback.
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-500', 'bg-gray-700'); // Remove visual feedback
    if (onFilesDrop) {
      onFilesDrop(Array.from(e.dataTransfer.files));
    }
  };

  // handleClick simulates a click on the hidden file input when the div is clicked.
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // handleFileChange captures files selected via the file input and passes them to onFilesDrop.
  const handleFileChange = (e) => {
    if (onFilesDrop && e.target.files.length > 0) {
      onFilesDrop(Array.from(e.target.files));
    }
    // Clear the input value so the same file can be selected again if needed
    e.target.value = '';
  };

  return (
    <div
      onDrop={handleDrop} // Updated handler
      onDragOver={handleDragOver} // Added handler
      onDragLeave={handleDragLeave} // Added handler
      onClick={handleClick} // Added click handler to trigger file input
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500
                 cursor-pointer hover:border-indigo-500 hover:text-indigo-300 transition-colors duration-200" // Added cursor and hover styles
    >
      <ArrowUpTrayIcon className="w-8 h-8 mb-2" />
      <p>Drag and drop photos here</p>
      <p className="text-sm text-gray-400">or click to browse</p>

      {/* Hidden file input */}
      <input
        type="file"
        multiple // Allow multiple file selection
        accept="image/*" // Suggest image files
        ref={fileInputRef} // Attach the ref
        onChange={handleFileChange} // Handle file selection
        className="hidden" // Keep it hidden
      />
    </div>
  );
}