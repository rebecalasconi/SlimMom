// src/pages/CalculatorPage.jsx
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
    bloodType: '',
  });

  const [dailyRate, setDailyRate] = useState(0);
  const [consumed, setConsumed] = useState(0);
  const [notRecommendedFoods, setNotRecommendedFoods] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('calorieFormData'));
    if (storedData) {
      setUserData(storedData);
      const caloriesData = JSON.parse(localStorage.getItem('caloriesData'));
      setDailyRate(caloriesData?.dailyRate || 2000); // 2000 este un placeholder
      setConsumed(caloriesData?.consumed || 0); // Consum începe de la 0
      setNotRecommendedFoods(caloriesData?.notRecommendedFoods || ['Pizza', 'Burger', 'Soda']); // Alimente interzise ca exemplu
    }
  }, []);
  

  return (
    <>
      <Header />
      <div className="container">
        <div className="leftPanel">
          <DailyCaloriesForm initialValues={userData} />
        </div>
        <div className="rightPanel">
          <RightSideBar
            dailyRate={dailyRate}
            consumed={consumed}
            notRecommendedFoods={notRecommendedFoods}
          />
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
