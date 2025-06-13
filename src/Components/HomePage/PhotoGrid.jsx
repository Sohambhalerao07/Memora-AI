import React, { useEffect, useState } from 'react';
import PhotoTile from './PhotoTile';
import { getDatabase, ref, onValue } from 'firebase/database';

const PhotoGrid = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const galleryRef = ref(db, 'user_galleries');

    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const galleryList = Object.values(data);
        setGalleries(galleryList);
      }
    });

    return () => unsubscribe();
  }, []);
  console.log(galleries,"Galleries");
  
  return (
    <section className="flex-1">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {galleries.map((gallery, index) => (
          <PhotoTile
          key={index}
          imageUrl={gallery.coverImage}
          altText={gallery.name}
          peopleTags={[]} // you can add this later if needed
          eventTag={{ label: gallery.name, color: "bg-indigo-50 text-indigo-600" }}
          />
        ))}
      </div>
    </section>
  );
};

export default PhotoGrid;
