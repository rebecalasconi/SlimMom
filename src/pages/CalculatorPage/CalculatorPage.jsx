import React, { useState, useEffect } from 'react';
import DailyCaloriesForm from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import Header from '../../components/Header/Header';
import './CalculatorPage.css';

const CalculatorPage = () => {
  const [userData, setUserData] = useState({
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '1',
  });

  const [dailyRate, setDailyRate] = useState(0);
  const [consumed, setConsumed] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [notRecommendedFoods, setNotRecommendedFoods] = useState([]);
  const [forbiddenFoods, setForbiddenFoods] = useState([]);
  const [allForbiddenFoods, setAllForbiddenFoods] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem('selectedDate', date);
    loadDataForDate(date); // Actualizăm datele consumate pentru data nouă
  };

  const getUserKey = (key) => {
    const userName = localStorage.getItem('userName');
    return userName ? `${userName}_${key}` : key;
  };

  const loadDataForDate = (date) => {
    const userKey = getUserKey('caloriesDataByDate');
    const savedData = JSON.parse(localStorage.getItem(userKey)) || {};
    const dataForSelectedDate = savedData[date] || { consumed: 0 };

    setConsumed(dataForSelectedDate.consumed || 0);
  };

  useEffect(() => {
    // Date generale
    const storedData = JSON.parse(localStorage.getItem('caloriesData'));
    const storedFormData = JSON.parse(localStorage.getItem('calorieFormData'));
    const storedSelectedDate = localStorage.getItem('selectedDate') || new Date().toISOString().split('T')[0];

    setSelectedDate(storedSelectedDate);
    loadDataForDate(storedSelectedDate);

    if (storedData) {
      setDailyRate(storedData.dailyRate || 0);
      setForbiddenFoods(storedData.forbiddenFoods || []);
      setAllForbiddenFoods(storedData.allForbiddenFoods || []);
    }

    if (storedFormData) {
      setUserData(storedFormData);
    }
  }, []);

  return (
    <>
    <div className='full-container'>
     <Header />
      <div className="container">
        <div className="leftPanel">
          <h1>Calculate your daily calorie intake right now</h1>
          <DailyCaloriesForm initialValues={userData} onDateChange={handleDateChange} />
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

export default CalculatorPage;
