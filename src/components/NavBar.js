import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-Navbar-dark p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/">Algo Arena</a>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-gray-300 hover:text-white">
            Home
          </a>
          <a href="/about" className="text-gray-300 hover:text-white">
            News
          </a>
          <a href="/contact" className="text-gray-300 hover:text-white">
            Resources
          </a>
        </div>
        {/* Mobile hamburger menu */}
        <div className="md:hidden">
          <button onClick={toggleNavbar} className="text-gray-300 hover:text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <a href="/" className="block text-gray-300 hover:text-white py-2 px-4">
            Home
          </a>
          <a href="/coders" className="block text-gray-300 hover:text-white py-2 px-4">
            Coders
          </a>
          <a href="/about" className="block text-gray-300 hover:text-white py-2 px-4">
            About
          </a>
          <a href="/contact" className="block text-gray-300 hover:text-white py-2 px-4">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
