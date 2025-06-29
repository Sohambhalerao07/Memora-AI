// pages/CreateGallery.jsx
import React, { useState } from "react";
import Navbar from "../Components/GallaryPage/NavBar";
import GalleryTips from "../Components/GallaryPage/GalleryTips";
import PhotoUpload from "../Components/GallaryPage/PhotoUpload";
import { getDatabase, ref, push } from "firebase/database";
import { auth } from "../firebase";
import AlertModal from "../Components/PopupModel/AlertModal";

export default function CreateGallery({ onClose }) {
  const [photos, setPhotos] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [galleryName, setGalleryName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const saveGallery = async (
    galleryName,
    eventDate,
    eventDescription,
    photoUrls
  ) => {
    const db = getDatabase();
    const galleryRef = ref(db, "user_galleries");

    await push(galleryRef, {
      name: galleryName,
      date: eventDate,
      description: eventDescription,
      timestamp: Date.now(),
    });
  };
  const saveToDatabase = async (downloadUrl) => {
    const db = getDatabase();
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("User not logged in");
      return;
    }
  };
  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Upload failed: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      const fileUrl = data.url;

      await saveToDatabase(fileUrl);
       setAlert({ show: true, type: 'success', message: 'Images uploaded successfully!' });
    } catch (error) {
     setAlert({ show: true, type: 'error', message: 'Upload failed. Try again.' });
    }
  };

  return (
    <div className="max-h-[95vh] rounded-xl bg-gray-50 mt-10">
      <main className="max-w-4xl rounded-2xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 justify-center">
          <div className="flex flex-col ml-auto justify-center align-middle ">
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
                value={galleryName}
                onChange={(e) => setGalleryName(e.target.value)}
                placeholder="E.g., Summer Music Festival 2024"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Description
              </label>
              <textarea
                rows={4}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Provide a brief description of your event."
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  saveGallery(
                    galleryName,
                    eventDate,
                    eventDescription,
                    photoUrls
                  );
                  onClose(); // Optionally close modal
                }}
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
      {alert.show && (
  <AlertModal
    type={alert.type}
    message={alert.message}
    onClose={() => setAlert({ ...alert, show: false })}
  />
)}
    </div>
  );
}
