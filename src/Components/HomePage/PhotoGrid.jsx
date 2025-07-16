import React, { useEffect, useState } from "react";
import PhotoTile from "./PhotoTile";
import { getDatabase, ref, onValue } from "firebase/database";
import Modal from "../PopupModel/Model";
import IndividualGalleryPage from "../../pages/IndividualGalleryPage";

const PhotoGrid = () => {
  const [galleries, setGalleries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const galleryRef = ref(db, "user_galleries");

    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const galleryList = Object.values(data);
        setGalleries(galleryList);
      }
    });

    return () => unsubscribe();
  }, []);

  
  return (
    <section className="flex-1">
      <div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        onClick={() => setShowModal(true)}
      >
        
       {galleries.map((gallery, index) => {

  return (
    <PhotoTile
      key={index}
      imageUrl={gallery.coverImage}
      altText={gallery.name}
      peopleTags={[]}
      eventTag={{
        label: gallery.name,
        color: "bg-indigo-50 text-indigo-600",
      }}
      onClick={() => {
        setSelectedGallery(gallery.name);
        setShowModal(true);
      }}
    />
  );
})}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <IndividualGalleryPage
          galleryName={selectedGallery}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      </div>
    </section>
  );
};

export default PhotoGrid;
