import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.jsx';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import DiaryPage from './pages/DiaryPage/DiaryPage.jsx'


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/calculator"
          element={
            <PrivateRoute>
              <CalculatorPage />
            </PrivateRoute>
          }></Route>
                  <Route
          path="/diary"
          element={
            <PrivateRoute>
              <DiaryPage />
            </PrivateRoute>
          }></Route>
      </Routes>
    </>
  );
};

export default App;
