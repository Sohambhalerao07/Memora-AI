// components/FaceAvatar.js
import React from "react";
import clsx from "clsx";

export default function FaceAvatar({ name, imageUrl, status = "active" }) {
  const statusColor = {
    active: "bg-green-500",
    idle: "bg-yellow-400",
    unavailable: "bg-red-500",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
        />
        <span
          className={clsx(
            "absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white",
            statusColor[status]
          )}
        />
      </div>
      <p className="text-sm mt-1">{name}</p>
    </div>
  );
}
