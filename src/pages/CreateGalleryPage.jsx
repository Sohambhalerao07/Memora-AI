// pages/CreateGallery.jsx
import React, { useState } from "react";
import Navbar from "../Components/GallaryPage/NavBar";
import GalleryTips from "../Components/GallaryPage/GalleryTips";
import PhotoUpload from "../Components/GallaryPage/PhotoUpload";
import { getDatabase, ref, push } from "firebase/database";

export default function CreateGallery() {
  const [photos, setPhotos] = useState([]);

  const saveToDatabase = async (downloadUrl) => {
    const db = getDatabase();
    const photosRef = ref(db, "user_galleries/gallery_id/photos");
    await push(photosRef, { imageUrl: downloadUrl, timestamp: Date.now() });
  };
  const handleUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) { // Check for HTTP errors (e.g., 404, 500)
      const errorData = await response.json(); // Or response.text()
      throw new Error(`Upload failed: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    const fileUrl = data.url;

    await saveToDatabase(fileUrl);
    console.log(`Successfully uploaded and saved ${file.name}`);
    // Consider updating UI to show success for this file
  } catch (error) {
    console.error("Error uploading or saving file:", file.name, error);
    // Inform the user about the failure (e.g., display an error message next to the file, use a toast notification)
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex flex-col ml-auto translate-x-97 ">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
              Create Your New Gallery
            </h1>
            <p className="text-gray-600 mb-6 translate-x-7">
              Organize and share your event memories with ease.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gallery Name
              </label>
              <input
                type="text"
                placeholder="E.g., Summer Music Festival 2024"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Description
              </label>
              <textarea
                rows={4}
                placeholder="Provide a brief description of your event. This helps organize your memories."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Photos
              </label>
              <PhotoUpload
                onFilesDrop={(newFiles) => {
                  setPhotos((prev) => [...prev, ...newFiles]);
                  newFiles.forEach((file) => handleUpload(file)); // <-- Upload each to backend + DB
                }}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
              >
                Next
              </button>
            </div>
          </form>
        </div>

        <div className="mt-29">
          <GalleryTips />
        </div>
      </main>
      <footer className="text-center text-xs text-gray-500 py-4 border-t border-gray-200">
        © 2023 Memora AI. All rights reserved.
      </footer>
    </div>
  );
}
