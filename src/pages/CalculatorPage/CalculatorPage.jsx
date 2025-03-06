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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);  // Data curentă

  const [notRecommendedFoods, setNotRecommendedFoods] = useState([]);
  const [forbiddenFoods, setForbiddenFoods] = useState([]);
  const [allForbiddenFoods, setAllForbiddenFoods] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Salvează noua dată selectată în localStorage
    localStorage.setItem('selectedDate', date);
  };
  

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('caloriesData'));
    const storedFormData = JSON.parse(localStorage.getItem('calorieFormData'));
    const storedSelectedDate = localStorage.getItem('selectedDate');  // Preia data din localStorage
  
    if (storedSelectedDate) {
      setSelectedDate(storedSelectedDate);  // Setează data salvată
    } else {
      setSelectedDate(new Date().toISOString().split('T')[0]);  // Dacă nu există, folosește data curentă
    }
  
    if (storedData) {
      setDailyRate(storedData.dailyRate || 0);
      setConsumed(storedData.consumed || 0);
      setForbiddenFoods(storedData.forbiddenFoods || []);
      setAllForbiddenFoods(storedData.allForbiddenFoods || []);
    }
  
    if (storedFormData) {
      setUserData(storedFormData);
    }
  }, []);
  
  return (
    <>
      <Header />
      <div className="container">
        <div className="leftPanel">
          <h1>Calculate your daily calorie intake right now</h1>
          <DailyCaloriesForm initialValues={userData} onDateChange={handleDateChange} /> {/* trimitem funcția de schimbare a datei */}
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

export default CalculatorPage;
