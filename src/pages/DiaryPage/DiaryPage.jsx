import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductsList from '../../components/DiaryProductsList/DiaryProductsList';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import Header from '../../components/Header/Header';
import './DiaryPage.css';

const DiaryPage = () => {
  const [userData, setUserData] = useState({
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '1',
  });

  const [dailyData, setDailyData] = useState(() => {
    return JSON.parse(localStorage.getItem('dailyData')) || {};
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyRate, setDailyRate] = useState(0);
  const [consumed, setConsumed] = useState(0);
  const [forbiddenFoods, setForbiddenFoods] = useState([]);
  const [allForbiddenFoods, setAllForbiddenFoods] = useState([]);
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
//   const [selectedDate, setSelectedDate] = useState('');
  const [isUserSelectedDate, setIsUserSelectedDate] = useState(false); 

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('caloriesData'));
    const storedDate = storedData?.dateCompleted || new Date().toISOString().split('T')[0];
    const storedFormData = JSON.parse(localStorage.getItem('calorieFormData'));
    setSelectedDate(storedDate);

    if (storedData) {
      setDailyRate(storedData.dailyRate || 0);
      setConsumed(storedData.consumed || 0);
      setForbiddenFoods(storedData.forbiddenFoods || []);
      setAllForbiddenFoods(storedData.allForbiddenFoods || []);
      setSelectedDate(storedData.dateCompleted || new Date().toISOString().split('T')[0]);
    }

    if (storedFormData) {
      setUserData(storedFormData);
    }
  }, []);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`; // Formatul corect: dd.MM.yyyy
  };
  
  const updateCalories = (calories) => {
    // Logica pentru actualizarea caloriilor
    setConsumed(consumed + calories);
  };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//     setIsUserSelectedDate(true);
//   };

const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setIsUserSelectedDate(true);
  
    // Verifică dacă există date salvate pentru noua dată
    const savedData = JSON.parse(localStorage.getItem('caloriesDataByDate')) || {};
    const dataForSelectedDate = savedData[newDate] || { products: [], consumed: 0 };
  
    setProducts(dataForSelectedDate.products);
    setConsumed(dataForSelectedDate.consumed);
  };

  const saveDataForDate = (date, products, consumed) => {
    const updatedData = {
      ...dailyData,
      [date]: { products, consumed },
    };
    setDailyData(updatedData);
    localStorage.setItem('dailyData', JSON.stringify(updatedData));
  };

  const addProductToList = (product) => {
    const updatedProducts = [...products, product];
    const updatedConsumed = consumed + product.calories;
    setProducts(updatedProducts);
    setConsumed(updatedConsumed);
    saveDataForDate(selectedDate, updatedProducts, updatedConsumed);
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('caloriesDataByDate')) || {};
  
    savedData[selectedDate] = {
      products,
      consumed,
    };
  
    localStorage.setItem('caloriesDataByDate', JSON.stringify(savedData));
  }, [products, consumed, selectedDate]);
  
  const handleRemoveProduct = (id, calories) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    const updatedConsumed = consumed - calories;
    setProducts(updatedProducts);
    setConsumed(updatedConsumed);
    saveDataForDate(selectedDate, updatedProducts, updatedConsumed);
  };

// const addProductToList = (newProduct) => {
//   setProductList((prevList) => [...prevList, newProduct]);
// };

useEffect(() => {
    const dataForSelectedDate = dailyData[selectedDate] || { products: [], consumed: 0 };
    setProducts(dataForSelectedDate.products);
    setConsumed(dataForSelectedDate.consumed);
  }, [selectedDate, dailyData]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="leftPanel">
          <div className="datePickerContainer">
          <p className="selectedDate">
          {isUserSelectedDate ? formatDate(selectedDate) : selectedDate}</p>
            <label htmlFor="date" className="calendarLabel">
              📅
            </label>
            <input
              id="date"
              type="date"
              className="calendarPicker"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          <DiaryAddProductForm
  addProductToList={addProductToList}
  allForbiddenFoods={allForbiddenFoods}
  selectedDate={selectedDate}
  updateCalories={updateCalories}
  productList={products}
  removeProduct={handleRemoveProduct} // Asigură-te că este transmis corect în props
/>

        </div>

        <div className="rightPanel">
          <RightSideBar
            dailyRate={dailyRate}
            consumed={consumed}
            forbiddenFoods={forbiddenFoods}
            allForbiddenFoods={allForbiddenFoods}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </>
  );
};

export default DiaryPage;

