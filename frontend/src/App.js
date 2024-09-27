import React from 'react';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import SearchBar from './components/SearchBar';
import RestaurantList from './components/RestaurantList'; // Import the RestaurantList component

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <SearchBar />
        <CategoryList />
        <div className="mt-8"> {/* Add some margin-top for spacing */}
          <RestaurantList /> {/* Display the list of nearby restaurants */}
        </div>
      </div>
    </div>
  );
}

export default App;
