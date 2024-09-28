import React, { useState, useEffect } from 'react';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(10); // Default radius in km
  const [nextPageToken, setNextPageToken] = useState(null); // To store the next page token
  const [loadingMore, setLoadingMore] = useState(false); // For loading more button

  const fetchRestaurants = async (latitude, longitude, searchRadius, token, reset = false) => {
    try {
      const radiusInMeters = searchRadius * 1000;
      const response = await fetch(
        `http://localhost:5000/api/restaurants?lat=${latitude}&lng=${longitude}&radius=${radiusInMeters}${token ? `&pagetoken=${token}` : ''}`
      );
      const data = await response.json();
      
      if (data.results) {
        // Reset restaurants if specified
        if (reset) {
          setRestaurants(data.results); // Reset the restaurant list
        } else {
          // Avoid duplicates when updating the restaurants
          setRestaurants((prevRestaurants) => [
            ...prevRestaurants,
            ...data.results.filter((newRestaurant) => 
              !prevRestaurants.some((prevRestaurant) => prevRestaurant.place_id === newRestaurant.place_id)
            ),
          ]);
        }
        setNextPageToken(data.next_page_token); // Store the next page token
      } else {
        setError('No restaurants found.');
      }
      
      setLoading(false);
      setLoadingMore(false); // Reset loading more
    } catch (err) {
      setError('Failed to fetch restaurant data.');
      setLoading(false);
      setLoadingMore(false); // Reset loading more
    }
  };

  useEffect(() => {
    const getLocationAndFetchRestaurants = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchRestaurants(latitude, longitude, radius, null, true); // Initial fetch with reset
        },
        (err) => {
          setError('Unable to retrieve location. Please enable location services.');
          setLoading(false);
        }
      );
    };

    getLocationAndFetchRestaurants();
  }, [radius]);

  // Handle slider change
  const handleSliderChange = (e) => {
    setRadius(Number(e.target.value)); // Update radius
  };

  // Handle slider mouse up
  const handleSliderMouseUp = () => {
    const getLocationAndFetchRestaurants = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchRestaurants(latitude, longitude, radius, null, true); // Fetch with new radius
        },
        (err) => {
          setError('Unable to retrieve location. Please enable location services.');
          setLoading(false);
        }
      );
    };

    getLocationAndFetchRestaurants();
  };

  // Handle text input change
  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    setRadius(value);
    setRestaurants([]); // Reset restaurants on radius change
    setNextPageToken(null); // Reset next page token
    
    // Fetch restaurants again with the new radius
    const getLocationAndFetchRestaurants = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchRestaurants(latitude, longitude, value, null, true); // Fetch with new radius
        },
        (err) => {
          setError('Unable to retrieve location. Please enable location services.');
          setLoading(false);
        }
      );
    };

    getLocationAndFetchRestaurants();
  };

  // Load more restaurants
  const loadMoreRestaurants = async () => {
    if (nextPageToken) {
      setLoadingMore(true);
      const latitude = restaurants.length ? restaurants[0].geometry.location.lat : 0; // Get last fetched restaurant latitude
      const longitude = restaurants.length ? restaurants[0].geometry.location.lng : 0; // Get last fetched restaurant longitude
      
      await fetchRestaurants(latitude, longitude, radius, nextPageToken); // Fetch more restaurants with token
    }
  };

  // Function to format the opening hours
  const formatOpeningHours = (openingHours) => {
    if (!openingHours || !openingHours.periods) return 'Hours not available';

    // Get today's opening hours
    const today = new Date().getDay();
    const todayHours = openingHours.periods[today];

    if (todayHours) {
      const openTime = todayHours.open.time; // Example: "1130"
      const closeTime = todayHours.close.time; // Example: "0000"
      return `${formatTime(openTime)} – ${formatTime(closeTime)}`;
    }

    return 'Hours not available';
  };

  // Function to format time from "HHMM" to "HH:MM AM/PM"
  const formatTime = (time) => {
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = time.substring(2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ((hours + 11) % 12 + 1) + ':' + minutes + ' ' + ampm;
    return formattedHours;
  };

  return (
    <div className="restaurant-list">
      {/* Slider and text input for adjusting radius */}
      <div className="flex items-center mb-4">
        <label htmlFor="radius-slider" className="mr-4">Search Radius (km):</label>
        <input
          type="range"
          id="radius-slider"
          min="1"
          max="100"
          step="1"
          value={radius}
          onChange={handleSliderChange}
          onMouseUp={handleSliderMouseUp} // Trigger fetch on mouse up
          className="mr-4"
        />
        <input
          type="number"
          value={radius}
          onChange={handleInputChange}
          className="border p-2 w-20"
          min="1"
          max="100"
        />
      </div>

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
              <p className="text-sm">
                <span className="text-yellow-500">Rating: {restaurant.rating ? `${restaurant.rating} ⭐` : 'No rating available'}</span><br />
                <span className="text-gray-600">Today's Hours: {formatOpeningHours(restaurant.opening_hours)}</span>
              </p>
            </li>
          ))}
        </ul>

      )}

      {/* Load More button */}
      {nextPageToken && !loadingMore && (
        <button
          onClick={loadMoreRestaurants}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Load More
        </button>
      )}

      {/* Loading state for more results */}
      {loadingMore && <p>Loading more restaurants...</p>}
    </div>
  );
};

export default RestaurantList;
