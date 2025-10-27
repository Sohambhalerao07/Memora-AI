import { getDatabase, ref, push, set, onValue, } from "firebase/database";
import React, { useState,useEffect } from 'react';
import { Search, Filter, Plus, ChevronDown, Grid3X3 } from 'lucide-react';
import Selection from "../assets/Selection.png"
import { getAuth } from "firebase/auth";
import FaceAvatar from "../Components/Avatar/FaceAvatar";


export default function IndividualGalleryPage({ galleryName, onClose }) {
  const [tab, setTab] = useState('photos');
  const [photos, setPhotos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
const [faces, setFaces] = useState([]);

useEffect(() => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userId = currentUser?.uid || "guest";

  const db = getDatabase();
  const imagesRef = ref(db, `user_galleries/${galleryName}/images`);
  const facesRef = ref(db, `user_galleries/${galleryName}/faces`);

  const unsubscribeImages = onValue(imagesRef, (snapshot) => {
    const data = snapshot.val();
    setPhotos(data ? Object.values(data) : []);
  });

  const unsubscribeFaces = onValue(facesRef, (snapshot) => {
    const data = snapshot.val();

    const faceArray = data
      ? Object.entries(data).map(([personId, personData]) => ({
          id: personId,
          name: personId.replace(/_/g, " "),
          imageUrl: personData?.photoUrls?.[0] || Selection,
          allImages: personData?.photoUrls || [],
          status: "active",
        }))
      : [];

    setFaces(faceArray);
  });

  return () => {
    unsubscribeImages();
    unsubscribeFaces();
  };
}, [galleryName]);

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter(file => file.type.startsWith("image/"));

    for (const file of imageFiles) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!response.ok || !data.url) throw new Error("Upload failed");

        const db = getDatabase();
        const galleryRef = ref(db, `user_galleries/${galleryName}/images`);
        const newImageRef = push(galleryRef);

        await set(newImageRef, {
          url: data.url,
          alt: file.name,
        });

      } catch (error) {
        console.error(`❌ Error uploading ${file.name}`, error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white px-6 py-4 mt-20 rounded-2xl max-h-[95vh] ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{galleryName}</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-purple-700"
          onClick={() => setShowModal(true)}
        >
          Add Images
        </button>
      </div>
{faces.length > 0 && (
  <div className="space-y-6">
    {faces.map((face) => (
      <div key={face.id}>
        <div className="flex items-center gap-4 mb-2">
          <FaceAvatar
            name={face.name}
            imageUrl={face.imageUrl}
            status={face.status}
          />
          <h2 className="text-lg font-semibold">{face.name}'s Subgallery</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {face.allImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Face ${face.name} - ${index}`}
              className="w-full h-auto object-cover rounded-xl shadow-sm"
            />
          ))}
        </div>
      </div>
    ))}
  </div>
)}


      {/* UI tabs and search omitted for brevity */}

      {photos.length === 0 ? (
        <EmptyState
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          isDragging={isDragging}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-sm">
              <img src={photo.url} alt={photo.alt} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const EmptyState = ({ onDrop, onDragOver, onDragLeave, isDragging }) => (
  <div
    className={`flex min-h-[70vh] flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-lg transition-colors ${
      isDragging ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
    }`}
    onDrop={onDrop}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
  >
    <img src={Selection} className="h-30 w-30"></img>
    <h2 className="text-lg font-semibold">Insert Images</h2>
    <p className="text-sm text-gray-500">or Drag and Drop here</p>
  </div>
);
