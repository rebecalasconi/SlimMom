import React from 'react';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';
import './MainPage.css';
import Header from '../components/Header/Header';
import Background from '../components/Background/Background';


const MainPage = () => {
  return (
    <div className="page-container"> {/* Container care dă context pentru z-index */}
      <Background />
      <Header />
      <main className="main">
        <h1>Calculate your daily calorie intake right now</h1>
        <DailyCaloriesForm />
      </main>
    </div>
  );
};

export default MainPage;

