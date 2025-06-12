

import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import UserDropdown from './UserDropdown';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavLinks />
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu">
            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <UserDropdown />
        </div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;