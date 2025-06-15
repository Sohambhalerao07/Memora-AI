// Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] px-6 md:px-10 py-3">
      <div className="flex items-center gap-4 text-[#0e141b]">
        <Logo />
        <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em]">Memora AI</h2>
      </div>

      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        <nav className="hidden md:flex items-center gap-6 md:gap-9">
          <a className="text-[#0e141b] text-sm font-medium leading-normal hover:text-[#1980e6]" href="#">Home</a>
          <a className="text-[#0e141b] text-sm font-medium leading-normal hover:text-[#1980e6]" href="#">Create</a>
          <a className="text-[#0e141b] text-sm font-medium leading-normal hover:text-[#1980e6]" href="#">Explore</a>
        </nav>

        <div className="flex gap-2">
          <IconButton icon="search" />
          <IconButton icon="chat" />
          <IconButton icon="bell" />
        </div>

        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 md:size-10"
          style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/8fb188f8-b167-49aa-b786-b2501c06a1fe.png")' }}
        ></div>
      </div>
    </header>
  );
};

const Logo = () => (
  <div className="size-4">
    <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 4C25.78 14.21 33.78 22.21 44 24C33.78 25.78 25.78 33.78 24 44C22.21 33.78 14.21 25.78 4 24C14.21 22.21 22.21 14.21 24 4Z" fill="currentColor" />
        </svg>
  </div>
);

const IconButton = ({ icon }) => {
  const icons = {
    search: (
      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
    ),
    chat: (
      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z" />
    ),
    bell: (
      <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
    )
  };

  return (
    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 md:h-10 bg-[#e7edf3] text-[#0e141b] min-w-0 px-2.5 hover:bg-[#d0dbe7] transition-colors">
      <div className="text-[#0e141b] shadow-2xl hover:shadow-indigo-700" data-icon={icon} data-size="20px" data-weight="regular">
        <svg  xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
          {icons[icon]}
        </svg>
      </div>
    </button>
  );
};

export default Header;
