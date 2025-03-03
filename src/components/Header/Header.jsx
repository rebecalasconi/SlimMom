import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="SlimMom logo" className="logo__image" />
        <span className="logo__slim">Slim</span>
        <span className="logo__mom">Mom</span>
      </div>
      <div className="nav__separator"></div>
      <nav className="header__nav">
        <NavLink to="/login" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
          LOG IN
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
          REGISTRATION
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;

