const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/restaurants', async (req, res) => {
  const { lat, lng, radius, pagetoken } = req.query; // Get radius and pagetoken from query
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    // Construct the URL with or without the pagetoken
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${apiKey}${pagetoken ? `&pagetoken=${pagetoken}` : ''}`;
    
    const response = await axios.get(url);
    const restaurants = response.data.results;

    // Fetch opening hours for each restaurant
    const restaurantDetailsPromises = restaurants.map(async (restaurant) => {
      const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.place_id}&key=${apiKey}`;
      const detailResponse = await axios.get(detailUrl);
      return {
        ...restaurant,
        opening_hours: detailResponse.data.result.opening_hours // Add opening_hours to each restaurant
      };
    });

    const detailedRestaurants = await Promise.all(restaurantDetailsPromises);
    
    res.json({
      results: detailedRestaurants,
      next_page_token: response.data.next_page_token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch restaurant data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
