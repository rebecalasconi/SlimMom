// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './Header.css';
// import { Link, useLocation } from 'react-router-dom';
// import logo from '../../assets/images/logo.png';

// const Header = () => {
  
//   const token = localStorage.getItem('token');
//   const userName = localStorage.getItem('userName');
//   const location = useLocation();
//   const isProtectedPage = location.pathname === '/diary' || location.pathname === '/calculator';

//   return (
//     <header className="header">
//       <div className="header__logo">
//         <img src={logo} alt="SlimMom logo" className="logo__image" />
//         <span className="logo__slim">Slim</span>
//         <span className="logo__mom">Mom</span>
//       </div>
//       <div className="nav__separator"></div>
//       <nav className="header__nav">
//         <NavLink to="/login" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
//           LOG IN
//         </NavLink>
//         <NavLink to="/register" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
//           REGISTRATION
//         </NavLink>
//       </nav>
//     </header>
//   );
// };

// export default Header;

// import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import './Header.css';
// import { useMediaQuery } from 'react-responsive'; // Importă useMediaQuery
// import logo from '../../assets/images/logo.png';

// const Header = () => {
//   const token = localStorage.getItem('token');
//   const userName = localStorage.getItem('userName');
//   const location = useLocation();
//   const isTabletOrMobile = useMediaQuery({ maxWidth: 1280 }); // Verifică dacă ești pe tabletă sau mobile

//   const isCalculatorPage = location.pathname === '/calculator';

//   return (
//     <header className="header">
//       <div className="header__logo">
//         <img src={logo} alt="SlimMom logo" className="logo__image" />
//         <span className="logo__slim">Slim</span>
//         <span className="logo__mom">Mom</span>
//       </div>
//       <div className="nav__separator"></div>
//             {/* Afișează userInfo doar pe CalculatorPage și pe mobile/tablet */}
//             {isCalculatorPage && isTabletOrMobile && userName && (
//         <div className="userInfoCalc">
//           <span className='userInfoName'>{userName}</span>
//           <span className="separator">|</span>
//           <button onClick={() => window.location.href = '/'} className="exitButton">Exit</button>
//         </div>
//       )}
//       <nav className="header__nav">
//         <NavLink to="/login" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
//           LOG IN
//         </NavLink>
//         <NavLink to="/register" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>
//           REGISTRATION
//         </NavLink>

//       </nav>


//     </header>
//   );
// };

// export default Header;
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
        <div className="modal show">
          <div className="modal-content">
          <NavLink to="/diary" className={({ isActive }) => isActive ? 'modal-link selected' : 'modal-link'}>
              DIARY
            </NavLink>
            <NavLink to="/calculator" className={({ isActive }) => isActive ? 'modal-link selected' : 'modal-link'}>
              CALCULATOR
            </NavLink>
          </div>
        </div>
      )}
 {/* Condiționăm display: none pe header__nav pentru CalculatorPage și tabletă */}
 <nav className={`header__nav ${isCalculatorPage && isTabletOrMobile ? 'hide-nav' : ''}`}>
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
