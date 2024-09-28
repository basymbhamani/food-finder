import React from 'react';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import RestaurantList from './components/RestaurantList'; // Import the RestaurantList component
import SearchBar from './components/SearchBar'; // Import the SearchBar component

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <CategoryList />
        <div className="mt-6"> {/* Increased margin-top for spacing between CategoryList and SearchBar */}
          <SearchBar /> {/* Moved the SearchBar below the CategoryList */}
        </div>
        <div className="mt-4"> {/* Reduced margin-top for spacing between SearchBar and RestaurantList */}
          <RestaurantList /> {/* Display the list of nearby restaurants */}
        </div>
      </div>
    </div>
  );
}

export default App;
