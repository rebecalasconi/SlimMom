import React from 'react';
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
        <a href="#" className="nav__link">LOG IN</a>
        <a href="#" className="nav__link">REGISTRATION</a>
      </nav>
    </header>
  );
};

export default Header;
