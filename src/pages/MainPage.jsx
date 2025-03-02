import React from 'react';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';
// import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <main>
      <h1>Calculate your daily calorie intake right now</h1>
      <DailyCaloriesForm />
    </main>
  );
};

export default MainPage;
