import React from 'react';
import PhotoActions from './PhotoActions';

const PhotoTile = ({ imageUrl, altText, peopleTags, eventTag, onClick }) => {
  // console.log(imageUrl,"imageurl")
  // console.log(altText);
  
  return (
    <div 
      onClick={onClick} // ✅ This is the fix
      className="relative group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 cursor-pointer"
    >
      <img 
        src={imageUrl} 
        alt={altText} 
        className="w-full h-56 object-cover rounded-2xl transition-transform duration-200 group-hover:scale-105" 
      />
      <div className="absolute top-3 left-3 flex gap-1">
        {peopleTags.map((tag, index) => (
          <span key={index} className="bg-white/80 text-indigo-600 px-2 py-0.5 rounded-full text-xs font-medium shadow">
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute top-3 right-3">
        <span className={`${eventTag.color} px-2 py-0.5 rounded-full text-xs font-medium shadow`}>
          {eventTag.label}
        </span>
      </div>
      <PhotoActions />
    </div>
  );
};

export default PhotoTile;
