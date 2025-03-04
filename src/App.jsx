import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.jsx';
// import LoginPage from './pages/LoginPage';
// import RegistrationPage from './pages/RegistrationPage';
// import DiaryPage from './pages/DiaryPage';
// import CalculatorPage from './pages/CalculatorPage';
import Header from './components/Header/Header';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/diary"
          element={
            <PrivateRoute>
              <CalculatorPage />
            </PrivateRoute>
          }></Route>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/calculator" element={<CalculatorPage />} /> */}
      </Routes>
    </>
  );
};

export default App;
