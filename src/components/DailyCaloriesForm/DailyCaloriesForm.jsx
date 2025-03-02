import React, { useState } from 'react';
import axios from 'axios';
import './DailyCaloriesForm.css';

const DailyCaloriesForm = () => {
  const [formData, setFormData] = useState({
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '1',
  });
  const [calories, setCalories] = useState(null);
  const [forbiddenFoods, setForbiddenFoods] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State pentru a deschide modalul

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Presupunem că backend-ul returnează caloriile și alimentele interzise
      const response = await axios.post('http://localhost:5000/dailycalorieintake', formData);
  
      setCalories(response.data.calories);
      setForbiddenFoods(response.data.forbiddenFoods);
  
      // Deschide modalul după ce datele sunt primite
      setModalOpen(true);
    } catch (error) {
      console.error('Error calculating calories:', error);
    }
  };

  // Funcția pentru a închide modalul
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="column">
          <label>Height* <input type="number" name="height" required onChange={handleChange} /></label>
          <label>Age* <input type="number" name="age" required onChange={handleChange} /></label>
          <label>Current weight* <input type="number" name="currentWeight" required onChange={handleChange} /></label>
        </div>

        <div className="column">
          <label>Desired weight* <input type="number" name="desiredWeight" required onChange={handleChange} /></label>
          <label>Blood type*</label>
          <div className="blood-type-options">
            {['1', '2', '3', '4'].map((type) => (
              <label key={type} className={`blood-type-label ${formData.bloodType === type ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="bloodType"
                  value={type}
                  checked={formData.bloodType === type}
                  onChange={handleChange}
                />
                <span className="radio-circle"></span>
                <span className="blood-type-number">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="submit-btn" type="submit">Start losing weight</button>
      </form>

      {/* Modalul care arată caloriile și alimentele interzise */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h3>Your Daily Calorie Intake: {calories} calories</h3>
            <p>Forbidden foods based on your blood type:</p>
            <ul>
              {forbiddenFoods.length > 0 ? (
                forbiddenFoods.map((food, index) => <li key={index}>{food}</li>)
              ) : (
                <li>No forbidden foods found.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCaloriesForm;
