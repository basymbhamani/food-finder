import React, { useState, useEffect } from 'react';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch restaurants
    const fetchRestaurants = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/restaurants?lat=${latitude}&lng=${longitude}`
        );
        const data = await response.json();

        if (data.results) {
          setRestaurants(data.results); // 'results' contains the list of places
        } else {
          setError('No restaurants found.');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch restaurant data.');
        setLoading(false);
      }
    };

    // Get user's location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchRestaurants(latitude, longitude); // Fetch restaurants based on user's location
      },
      (err) => {
        setError('Unable to retrieve location. Please enable location services.');
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="restaurant-list">
      <h2 className="text-xl font-semibold mb-4">Restaurants Nearby</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="space-y-4">
          {restaurants.map((restaurant) => (
            <li key={restaurant.place_id} className="restaurant-item bg-white shadow p-4 rounded-lg">
              <h3 className="text-lg font-bold">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.vicinity}</p>
              <p className="text-sm text-yellow-500">
                Rating: {restaurant.rating ? `${restaurant.rating} ⭐` : 'No rating available'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantList;
