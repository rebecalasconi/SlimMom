import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RightSideBar.css';

const RightSideBar = ({ dailyRate, consumed, allForbiddenFoods }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const caloriesData = JSON.parse(localStorage.getItem('caloriesData')) || {};
  const { dateCompleted = '' } = caloriesData;

  const [searchTerm, setSearchTerm] = useState('');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('caloriesData');
    navigate('/');
  };

  const kcalLeft = dailyRate - consumed;
  const percentageOfNormal = dailyRate ? ((consumed / dailyRate) * 100).toFixed(1) : 0;

  // Filtrarea alimentelor în funcție de ce introduce utilizatorul în searchTerm
  const filteredFoods = Array.isArray(allForbiddenFoods) 
    ? allForbiddenFoods.filter(food => food.toLowerCase().includes(searchTerm.toLowerCase())) 
    : [];

  return (
    <aside className="rightSideBar">
      <div className="userInfo">
        <span>{userName} </span>
        <span className="separator">|</span>
        <button onClick={handleSignOut} className="exitButton">
          Exit
        </button>
      </div>

      <div className="summary">
        <h3>Summary for {dateCompleted}</h3>

        <div className="summary-item">
          <span className="summary-key">Left </span>
          <span>{kcalLeft} kcal</span>
        </div>
        <div className="summary-item">
          <span className="summary-key">Consumed</span>
          <span>{consumed} kcal</span>
        </div>
        <div className="summary-item">
          <span className="summary-key">Daily Rate</span>
          <span>{dailyRate} kcal</span>
        </div>
        <div className="summary-item">
          <span className="summary-key">n% of normal</span>
          <span>{percentageOfNormal}</span>
        </div>
      </div>

      <div className="notRecommendedFoods">
        <h4>Food Not Recommended</h4>
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />

        <div className="food-list">
          {filteredFoods.length > 0 ? (
            <ul>
              {filteredFoods.map((food, index) => (
                <li key={index} className="food-item">
                  {food}
                </li>
              ))}
            </ul>
          ) : (
            <p>No matching products found</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
