import React from 'react';
import { Link } from 'react-router-dom';
// import styles from './Header.module.css';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <header >
      <Logo />
      <nav>
        <Link to="/login">LOG IN</Link> | <Link to="/register">REGISTRATION</Link>
      </nav>
    </header>
  );
};

export default Header;
