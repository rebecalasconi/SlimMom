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

  const [dailyRate, setDailyRate] = useState(0);
  const [consumed, setConsumed] = useState(0);
  const [forbiddenFoods, setForbiddenFoods] = useState([]);
  const [allForbiddenFoods, setAllForbiddenFoods] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
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
  

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setIsUserSelectedDate(true);
  };

  const addProductToList = (product) => {
    setProducts([...products, product]);
  };

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
          />
          <DiaryProductsList products={products} removeProduct={() => {}} />
        </div>

        <div className="rightPanel">
          <RightSideBar
            dailyRate={dailyRate}
            consumed={consumed}
            forbiddenFoods={forbiddenFoods}
            allForbiddenFoods={allForbiddenFoods}
          />
        </div>
      </div>
    </>
  );
};

export default DiaryPage;

