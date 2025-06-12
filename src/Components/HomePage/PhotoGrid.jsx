import React from 'react';
import PhotoTile from './PhotoTile';

const photos = [
  {
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    altText: "Beach Memory",
    peopleTags: ["Maya", "Alex"],
    eventTag: { label: "Vacation", color: "bg-indigo-50 text-indigo-600" }
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    altText: "Friends Memory",
    peopleTags: ["Chris"],
    eventTag: { label: "Birthday", color: "bg-yellow-50 text-yellow-600" }
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    altText: "Nature Memory",
    peopleTags: ["You"],
    eventTag: { label: "Hiking", color: "bg-green-50 text-green-600" }
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=400&q=80",
    altText: "Family Memory",
    peopleTags: ["Family"],
    eventTag: { label: "Anniversary", color: "bg-pink-50 text-pink-600" }
  }
];

const PhotoGrid = () => (
  <section className="flex-1">
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {photos.map((photo, index) => (
        <PhotoTile
          key={index}
          imageUrl={photo.imageUrl}
          altText={photo.altText}
          peopleTags={photo.peopleTags}
          eventTag={photo.eventTag}
        />
      ))}
    </div>
  </section>
);

export default PhotoGrid;