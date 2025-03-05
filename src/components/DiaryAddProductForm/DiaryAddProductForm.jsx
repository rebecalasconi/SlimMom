import React, { useState, useEffect } from 'react';
import './DiaryAddProductForm.css';

const DiaryAddProductForm = ({ addProductToList, allForbiddenFoods }) => {
  const [productName, setProductName] = useState('');
  const [grams, setGrams] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredForbiddenFoods, setFilteredForbiddenFoods] = useState([]);

  useEffect(() => {
    if (productName.length > 2) {
      fetch(`/api/foods?name=${productName}`)
        .then(response => response.json())
        .then(data => setFoodData(data))
        .catch(error => console.error('Error fetching food data:', error));
    } else {
      setFoodData([]);
    }
  }, [productName]);

  useEffect(() => {
    setFilteredForbiddenFoods(
      allForbiddenFoods.filter((food) =>
        food.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, allForbiddenFoods]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!grams || !selectedFood) return;

    const calories = (selectedFood.calories * grams) / 100;

    addProductToList({
      name: selectedFood.title,
      grams,
      calories: Math.round(calories),
    });

    setProductName('');
    setGrams('');
    setSelectedFood(null);
  };

  return (
    <form onSubmit={handleSubmit} className="productForm">
      
      <div className={`searchForbiddenFoods ${searchTerm && filteredForbiddenFoods.length > 0 ? 'active' : ''}`}>
        <input
          type="text"
          placeholder="Search forbidden foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />
        <ul className="searchResults">
          {filteredForbiddenFoods.map((food, index) => (
            <li key={index}>{food}</li>
          ))}
        </ul>
      </div>
      <input
        type="number"
        placeholder="Grams"
        value={grams}
        onChange={(e) => setGrams(e.target.value)}
        className="gramsInput"
      />
      
    </form>
  );
};

export default DiaryAddProductForm;
