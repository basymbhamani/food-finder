import React from 'react';

const Header = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-800">Food Finder</h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Favorites</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Visited</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
