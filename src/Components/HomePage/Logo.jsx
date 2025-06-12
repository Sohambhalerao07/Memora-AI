import React from 'react';

const Logo = () => (
  <div className="flex items-center gap-3">
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full">
       <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 4C25.78 14.21 33.78 22.21 44 24C33.78 25.78 25.78 33.78 24 44C22.21 33.78 14.21 25.78 4 24C14.21 22.21 22.21 14.21 24 4Z" fill="currentColor" />
        </svg>
    </span>
    <span className="text-lg font-bold font-jakarta tracking-tight">Memora AI</span>
  </div>
);

export default Logo;