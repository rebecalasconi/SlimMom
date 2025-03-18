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
  const [isUserSelectedDate, setIsUserSelectedDate] = useState(false); 

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  const [formattedDate, setFormattedDate] = useState(formatDate(new Date().toISOString().split('T')[0])); // format dd.mm.yyyy


  const getUserKey = (key) => {
    const userName = localStorage.getItem('userName');
    return userName ? `${userName}_${key}` : key;
  };
  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      setSelectedDate(new Date().toISOString().split('T')[0]);
      setProducts([]);
      setConsumed(0);
      setDailyRate(0);
      setForbiddenFoods([]);
      setAllForbiddenFoods([]);
      return;
    }
  
    const storedSelectedDate = localStorage.getItem('selectedDate') || new Date().toISOString().split('T')[0];
    setSelectedDate(storedSelectedDate);
    setFormattedDate(formatDate(storedSelectedDate));
    
    const userKey = getUserKey('caloriesDataByDate');
    const savedData = JSON.parse(localStorage.getItem(userKey)) || {};
    const dataForSelectedDate = savedData[storedSelectedDate] || { products: [], consumed: 0 };
    
    setProducts(dataForSelectedDate.products);
    setConsumed(dataForSelectedDate.consumed);
  
    const storedData = JSON.parse(localStorage.getItem('caloriesData'));
    const storedFormData = JSON.parse(localStorage.getItem('calorieFormData'));
  
    if (storedData) {
      setDailyRate(storedData.dailyRate || 0);
      setForbiddenFoods(storedData.forbiddenFoods || []);
      setAllForbiddenFoods(storedData.allForbiddenFoods || []);
    }
  
    if (storedFormData) {
      setUserData(storedFormData);
    }
  }, []);
  
  const updateCalories = (calories) => {
    setConsumed(consumed + calories);
  };
  
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setFormattedDate(formatDate(newDate));
    setIsUserSelectedDate(true);

    localStorage.setItem('selectedDate', newDate);
    
    // Actualizează datele pentru ziua selectată
    const userKey = getUserKey('caloriesDataByDate');
    const savedData = JSON.parse(localStorage.getItem(userKey)) || {};
    const dataForSelectedDate = savedData[newDate] || { products: [], consumed: 0 };
    
    setProducts(dataForSelectedDate.products);
    setConsumed(dataForSelectedDate.consumed);
  };
  
  
  const saveDataForDate = (date, products, consumed) => {
  const userKey = getUserKey('caloriesDataByDate');
  const existingData = JSON.parse(localStorage.getItem(userKey)) || {};
  const updatedData = {
      ...existingData,
      [date]: { products, consumed },
    };
    
    localStorage.setItem(userKey, JSON.stringify(updatedData));
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

useEffect(() => {
    const userKey = getUserKey('caloriesDataByDate');
    const savedData = JSON.parse(localStorage.getItem(userKey)) || {};
    
    const dataForSelectedDate = savedData[selectedDate] || { products: [], consumed: 0 };
    
    setProducts(dataForSelectedDate.products);
    setConsumed(dataForSelectedDate.consumed);
  }, [selectedDate]);

  return (
    <>
    <div className="container-full">
      <Header />
      <div className="container">
        <div className="leftPanel">
          <div className="datePickerContainer">
          <p className="selectedDate">
          {formatDate(selectedDate)}</p>
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
  removeProduct={handleRemoveProduct}
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
      </div>
    </>
  );
};

export default DiaryPage;

