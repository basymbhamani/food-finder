import React, { useRef } from 'react';
import './CategoryList.css'; // Import the CSS file

const categories = [
  { name: 'Grocery', imageUrl: './res/Grocery.jpeg' },
  { name: 'Pizza', imageUrl: 'pizza.jpg' },
  { name: 'Sushi', imageUrl: 'sushi.jpg' },
  { name: 'Indian', imageUrl: 'indian.jpg' },
  { name: 'Chinese', imageUrl: 'chinese.jpg' },
  { name: 'Healthy', imageUrl: 'healthy.jpg' },
  { name: 'Bubble Tea', imageUrl: 'bubble-tea.jpg' },
  { name: 'Korean', imageUrl: 'korean.jpg' },
  { name: 'Halal', imageUrl: 'halal.jpg' },
  { name: 'Soup', imageUrl: 'soup.jpg' },
  { name: 'Thai', imageUrl: 'thai.jpg' },
  { name: 'Fast Food', imageUrl: 'fast-food.jpg' },
  { name: 'Breakfast', imageUrl: 'breakfast.jpg' },
  { name: 'Sandwich', imageUrl: 'sandwich.jpg' },
  { name: 'Wings', imageUrl: 'wings.jpg' },
  { name: 'Greek', imageUrl: 'greek.jpg' },
  { name: 'Burgers', imageUrl: 'burgers.jpg' },
  { name: 'Desserts', imageUrl: 'desserts.jpg' },
  { name: 'Mexican', imageUrl: 'mexican.jpg' },
  { name: 'Vietnamese', imageUrl: 'vietnamese.jpg' },
  { name: 'Poke', imageUrl: 'poke.jpg' },
  { name: 'Italian', imageUrl: 'italian.jpg' },
  { name: 'Bakery', imageUrl: 'bakery.jpg' },
  { name: 'BBQ', imageUrl: 'bbq.jpg' },
  { name: 'Caribbean', imageUrl: 'caribbean.jpg' },
  { name: 'Vegan', imageUrl: 'vegan.jpg' },
  { name: 'Coffee', imageUrl: 'coffee.jpg' },
  { name: 'Japanese', imageUrl: 'japanese.jpg' },
  { name: 'Asian', imageUrl: 'asian.jpg' },
  { name: 'Alcohol', imageUrl: 'alcohol.jpg' },
  { name: 'Seafood', imageUrl: 'seafood.jpg' },
  { name: 'Salads', imageUrl: 'salads.jpg' },
  { name: 'Comfort Food', imageUrl: 'comfort-food.jpg' },
  { name: 'Smoothies', imageUrl: 'smoothies.jpg' },
  { name: 'Ice Cream', imageUrl: 'ice-cream.jpg' },
  { name: 'Soul Food', imageUrl: 'soul-food.jpg' },
  { name: 'American', imageUrl: 'american.jpg' },
  { name: 'Street Food', imageUrl: 'street-food.jpg' },
  { name: 'Hawaiian', imageUrl: 'hawaiian.jpg' }
];

const CategoryList = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 600; // Change scroll amount here
    scrollRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="category-list-container">
      <h2 className="category-list-title">Explore Categories</h2>
      <div className="category-list-controls">
        <button
          onClick={() => scroll(-1)}
          className="scroll-button left-scroll-button"
        >
          &lt;
        </button>
        <div
          ref={scrollRef}
          className="category-list"
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-item"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="category-image"
              />
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className="scroll-button right-scroll-button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
