import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Implement search logic here
  };

  return (
    <div className="flex items-center mb-6">
      <input
        type="text"
        placeholder="Search for restaurants, cuisines, or food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button 
        onClick={handleSearch} 
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
