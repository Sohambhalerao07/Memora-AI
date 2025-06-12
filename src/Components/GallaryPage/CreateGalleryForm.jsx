import React, { useState } from 'react';
import DatePicker from './DatePicker';
import FileUpload from './FileUpload';
import InfoTips from './InfoTips';

const CreateGalleryForm = () => {
  const [galleryName, setGalleryName] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ galleryName, eventDate, description, files });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-extrabold  text-gray-900 mb-2">Create Your New Gallery</h1>
      <p className="text-lg text-gray-600 mb-8">
        Organize and share your event memories with ease.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="gallery-name" className="block text-lg font-medium text-gray-900 mb-2">
            Gallery Name
          </label>
          <input
            type="text"
            id="gallery-name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="E.g., Summer Music Festival 2024"
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-900 mb-2">
            Event Date
          </label>
          <DatePicker selectedDate={eventDate} onChange={setEventDate} />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-900 mb-2">
            Event Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Provide a brief description of your event. This helps organize your memories."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <InfoTips />

        <FileUpload files={files} setFiles={setFiles} />

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Create Gallery
          </button>
        </div>
      </form>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Memora AI. All rights reserved.
      </footer>
    </div>
  );
};

export default CreateGalleryForm;