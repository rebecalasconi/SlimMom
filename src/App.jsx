import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
// import LoginPage from './pages/LoginPage';
// import RegistrationPage from './pages/RegistrationPage';
// import DiaryPage from './pages/DiaryPage';
// import CalculatorPage from './pages/CalculatorPage';
import Header from './components/Header/Header';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/calculator" element={<CalculatorPage />} /> */}
      </Routes>
    </>
  );
};

export default App;
