import React from 'react';

const NavLinks = () => (
  <div className="hidden md:flex items-center space-x-6">
    <a href="#" className="text-base font-medium hover:text-indigo-600 transition">My Photos</a>
    <a href="#" className="text-base font-medium hover:text-indigo-600 transition">Albums</a>
    <a href="#" className="text-base font-medium hover:text-indigo-600 transition">Shared</a>
    <a href="#" className="text-base font-medium hover:text-indigo-600 transition">Upload</a>
  </div>
);

export default NavLinks;