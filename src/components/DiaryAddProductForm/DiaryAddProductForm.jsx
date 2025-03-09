import React, { useState, useEffect } from 'react';
import './DiaryAddProductForm.css';
import axios from 'axios';

const DiaryAddProductForm = ({
  addProductToList,
  allForbiddenFoods,
  selectedDate,
  updateCalories,
  productList = [],
  removeProduct,
}) => {
  const [grams, setGrams] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allFoods, setAllFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    const fetchForbiddenFoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dailycalorieintake/forbiddenFoods');
        setAllFoods(response.data);
      } catch (error) {
        console.error('Error fetching forbidden foods:', error);
      }
    };
    fetchForbiddenFoods();
  }, []);

  useEffect(() => {
    setFilteredFoods(
      allFoods.filter((food) =>
        food.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, allFoods]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!grams || !selectedFood) {
      console.warn('Please select a food and enter grams.');
      return;
    }

    const calories = (selectedFood.calories * grams) / 100;

    const newProduct = {
      id: Date.now(),
      date: selectedDate,
      name: selectedFood.title,
      grams: parseInt(grams, 10),
      calories: Math.round(calories),
    };

    addProductToList(newProduct); 
    updateCalories(Math.round(calories));

    setGrams('');
    setSelectedFood(null);
    setSearchTerm('');
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setSearchTerm(food.title);
    setFilteredFoods([]);
  };

  const handleRemoveProduct = (id, calories) => {
    removeProduct(id, calories); // actualizează și caloriile
  };

  return (
    <div className='containerProductForm'>
      <form onSubmit={handleSubmit} className="productForm">
      <div className={`searchForbiddenFoods ${searchTerm && filteredFoods.length > 0 ? 'active' : ''}`}>
  <input
    type="text"
    placeholder="Enter product name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="searchInput"
  />
  {filteredFoods.length > 0 && (
    <ul className="searchResults">
      {filteredFoods
        .filter((food) => food.title !== selectedFood?.title) // Filtrăm alimentul deja selectat
        .map((food) => (
          <li key={food._id} onClick={() => handleFoodSelect(food)}>
            {food.title} - {food.calories} kcal/100g
          </li>
        ))}
    </ul>
  )}
</div>

        <input
          type="number"
          placeholder="Grams"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          className="gramsInput"
          required
        />
        <button type="submit" className="addButton">+</button>
      </form>

      <ul className="productList">
  {productList.map((product) => (
    <li key={product.id} className="productRow">
      <div className="productColumn nameColumn">
        {product.name}
        <div className="line-1"></div>
      </div>
      <div className="productColumn gramsColumn">
        {product.grams}g
        <div className="line-2"></div>
      </div>
      <div className="productColumn kcalColumn">
        {product.calories} kcal
        <div className="line-3"></div>
      </div>
      <button
        onClick={() => handleRemoveProduct(product.id, product.calories)}
        className="removeButton"
      >
        x
      </button>
    </li>
  ))}
</ul>

    </div>
  );
};

export default DiaryAddProductForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './DiaryAddProductForm.css';

// const DiaryAddProductForm = ({ addProductToList, selectedDate, updateCalories }) => {
//   const [productName, setProductName] = useState('');
//   const [grams, setGrams] = useState('');
//   const [selectedFood, setSelectedFood] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [allFoods, setAllFoods] = useState([]);
//   const [filteredFoods, setFilteredFoods] = useState([]);

//   useEffect(() => {
//     const fetchForbiddenFoods = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/dailycalorieintake/forbiddenFoods');
//         setAllFoods(response.data); // Salvează obiectele complete în state
//       } catch (error) {
//         console.error('Error fetching forbidden foods:', error);
//       }
//     };
//     fetchForbiddenFoods();
//   }, []);

//   useEffect(() => {
//     const filtered = allFoods.filter((food) =>
//       food.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredFoods(filtered);
//   }, [searchTerm, allFoods]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!grams || !selectedFood) return;

//     const calories = (selectedFood.calories * grams) / 100;
//     const newProduct = {
//       id: Date.now(),
//       date: selectedDate,
//       name: selectedFood.title,
//       grams,
//       calories: Math.round(calories),
//     };

//     addProductToList(newProduct);
//     updateCalories(Math.round(calories));

//     setProductName('');
//     setGrams('');
//     setSelectedFood(null);
//     setSearchTerm('');
//   };

//   const handleFoodSelect = (food) => {
//     setProductName(food.title);
//     setSelectedFood(food);
//     setSearchTerm(food.title);
//     setFilteredFoods([]);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="productForm">
//         <div className={`searchForbiddenFoods ${searchTerm && filteredFoods.length > 0 ? 'active' : ''}`}>
//           <input
//             type="text"
//             placeholder="Enter product name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="searchInput"
//           />
//           <ul className="searchResults">
//             {filteredFoods.map((food) => (
//               <li key={food._id} onClick={() => handleFoodSelect(food)}>
//                 {food.title} - {food.calories} kcal/100g
//               </li>
//             ))}
//           </ul>
//         </div>
//         <input
//           type="number"
//           placeholder="Grams"
//           value={grams}
//           onChange={(e) => setGrams(e.target.value)}
//           className="gramsInput"
//           required
//         />
//         <button type="submit" className="submitBtn">
//           Add product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default DiaryAddProductForm;

