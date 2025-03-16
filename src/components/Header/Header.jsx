
import React, { useState } from 'react';
import './Header.css';
import { useLocation, NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [ModalOpen, setModalOpen] = useState(false); // Stare pentru modal
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = localStorage.getItem('userName');
  const location = useLocation();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1280 });
  const isCalculatorPage = location.pathname === '/calculator';
  const isDiaryPage = location.pathname === '/diary';


  // Funcție pentru deschiderea și închiderea modalului
  const toggleModal = () => {
    setModalOpen(!ModalOpen);
    // Dacă modalul este deschis, oprește scroll-ul
    if (!ModalOpen) {
      document.body.style.overflow = 'hidden'; // Oprește scroll-ul
    } else {
      document.body.style.overflow = 'auto'; // Restabilește scroll-ul
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="SlimMom logo" className="logo__image" />
        <span className="logo__slim">Slim</span>
        <span className="logo__mom">Mom</span>
      </div>
      <div className="nav__separator"></div>

      {/* Afișăm userInfo doar pe CalculatorPage și pe mobile/tablet */}
      {(isCalculatorPage || isDiaryPage) && isTabletOrMobile && userName && (
        <div className="userInfoCalc">
          <span className='userInfoName'>{userName}</span>
          <span className="separator">|</span>
          <button onClick={() => window.location.href = '/'} className="exitButton">Exit</button>
        </div>
      )}

{/* Hamburger Button - 3 liniuțe sau X */}
{(isCalculatorPage || isDiaryPage) && isTabletOrMobile && (
  <div className={`hamburger ${ModalOpen ? 'open' : ''}`} onClick={toggleModal}>
    <span></span>
    <span></span>
    <span></span>
  </div>
)}


      {/* Modalul */}
      {ModalOpen && (
        <div className="modalHeader showHeader">
          <div className="modalHeader-content">
          <NavLink to="/diary" className={({ isActive }) => isActive ? 'modal-link selected' : 'modal-link'}>
              DIARY
            </NavLink>
            <NavLink to="/calculator" className={({ isActive }) => isActive ? 'modal-link selected' : 'modal-link'}>
              CALCULATOR
            </NavLink>
          </div>
        </div>
      )}
 {/* Condiționăm display: none pe header__nav pentru CalculatorPage și DiaryPage pe tabletă și mobil */}
 <nav className={`header__nav ${(isCalculatorPage || isDiaryPage) && isTabletOrMobile ? 'hide-nav' : ''}`}>
  <div className="nav-links-container">
    {/* Afișăm linkurile DIARY și CALCULATOR doar pe /diary și /calculator */}
    {(isCalculatorPage || isDiaryPage) && (
      <>
        {/* Link pentru DIARY */}
        <NavLink 
          to="/diary" 
          className={({ isActive }) => isActive || isDiaryPage ? "nav__link active bold" : "nav__link"}>
          DIARY
        </NavLink>

        {/* Link pentru CALCULATOR */}
        <NavLink 
          to="/calculator" 
          className={({ isActive }) => isActive || isCalculatorPage ? "nav__link active bold" : "nav__link"}>
          CALCULATOR
        </NavLink>
      </>
    )}

    {/* Dacă nu suntem pe /calculator sau /diary, afișăm logarea și înregistrarea */}
    {!isCalculatorPage && !isDiaryPage && (
      <>
        <NavLink to="/login" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
          LOG IN
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
          REGISTRATION
        </NavLink>
      </>
    )}
  </div>
</nav>

    </header>
  );
};

export default Header;
