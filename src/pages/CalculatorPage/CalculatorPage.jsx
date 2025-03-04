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
  const [forbiddenFoods, setForbiddenFoods] = useState([]);  // Adăugăm state pentru forbiddenFoods
  const [allForbiddenFoods, setAllForbiddenFoods] = useState([]);  // Adăugăm state pentru allForbiddenFoods

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('caloriesData'));
    // console.log(notRecommendedFoods)
    // console.log(forbiddenFoods)
    // console.log(allForbiddenFoods)
    if (storedData) {
      setDailyRate(storedData.dailyRate || 0);  // Setează dailyRate
      setConsumed(storedData.consumed || 0);  // Setează consumed
      setForbiddenFoods(storedData.forbiddenFoods || []);  // Setează forbiddenFoods
      setAllForbiddenFoods(storedData.allForbiddenFoods || []);  // Setează allForbiddenFoods
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="leftPanel">
            <h1>Calculate your daily calorie intake right now</h1>
          <DailyCaloriesForm initialValues={userData} />
        </div>
        <div className="rightPanel">
          <RightSideBar
            dailyRate={dailyRate}
            consumed={consumed}
            forbiddenFoods={forbiddenFoods}  // Transmite forbiddenFoods
            allForbiddenFoods={allForbiddenFoods}  // Transmite allForbiddenFoods
          />
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
