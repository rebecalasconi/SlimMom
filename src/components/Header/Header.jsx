// src/components/Header/Header.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  const location = useLocation();
  const isProtectedPage = location.pathname === '/diary' || location.pathname === '/calculator';

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="SlimMom logo" className="logo__image" />
        <span className="logo__slim">Slim</span>
        <span className="logo__mom">Mom</span>
      </div>
      <div className="nav__separator"></div>
      <nav className="header__nav">
        {token ? (
          <>
            <NavLink to="/diary" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
              DIARY
            </NavLink>
            <NavLink to="/calculator" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
              CALCULATOR
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
              LOG IN
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
              REGISTRATION
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
