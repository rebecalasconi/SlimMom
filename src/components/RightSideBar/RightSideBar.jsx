import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RightSideBar.css';
const RightSideBar = ({ dailyRate, consumed, notRecommendedFoods }) => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');
  
    const handleSignOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      navigate('/');
    };
  
    const kcalLeft = dailyRate - consumed;
    const percentageOfNormal = ((consumed / dailyRate) * 100).toFixed(1);
  
    return (
      <aside className="rightSideBar">
        <div className="userInfo">
          <span>{userName}</span>
          <span className="separator">|</span>
          <button onClick={handleSignOut} className="exitButton">
            Exit
          </button>
        </div>
  
        <div className="summary">
          <h3>Summary</h3>
          <div className="summary-item">
            <span>Calories Left: </span>
            <span>{kcalLeft} kcal</span>
          </div>
          <div className="summary-item">
            <span>Calories Consumed: </span>
            <span>{consumed} kcal</span>
          </div>
          <div className="summary-item">
            <span>Daily Rate: </span>
            <span>{dailyRate} kcal</span>
          </div>
          <div className="summary-item">
            <span>{percentageOfNormal}% of normal</span>
          </div>
        </div>
  
        <div className="notRecommendedFoods">
          <h4>Food Not Recommended</h4>
          <div className="food-list">
            {notRecommendedFoods.length > 0 ? (
              <ul>
                {notRecommendedFoods.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            ) : (
              <p>Your diet will be displayed here</p>
            )}
          </div>
        </div>
      </aside>
    );
  };
  

export default RightSideBar;
