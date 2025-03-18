import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import './Background.css'; 

const Background = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const isDiaryPage = location.pathname === '/diary';

  if (isDiaryPage && isMobile) {
    return null;
  }

  return (
    <div className='background'>
      <div className="background-leaf"></div>
      <div className="background-banana"></div>
      <div className="background-strawberry"></div>
      <div className="background-gray"></div>
    </div>
  );
};

export default Background;

