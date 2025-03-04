// src/components/CalculatorCalorieForm.jsx

import React, { useState } from 'react';
import './CalculatorCalorieForm.css';

const CalculatorCalorieForm = ({ initialValues = {} }) => {
  const [formData, setFormData] = useState({
    height: initialValues.height || '',
    age: initialValues.age || '',
    currentWeight: initialValues.currentWeight || '',
    desiredWeight: initialValues.desiredWeight || '',
    bloodType: initialValues.bloodType || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Height (cm):
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
      </label>

      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </label>

      <label>
        Current Weight (kg):
        <input
          type="number"
          name="currentWeight"
          value={formData.currentWeight}
          onChange={handleChange}
        />
      </label>

      <label>
        Desired Weight (kg):
        <input
          type="number"
          name="desiredWeight"
          value={formData.desiredWeight}
          onChange={handleChange}
        />
      </label>

      <label>
        Blood Type:
        <select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
        >
          <option value="">Select blood type</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </label>

      <button type="submit">Calculate</button>
    </form>
  );
};

export default CalculatorCalorieForm;
