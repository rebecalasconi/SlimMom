import React, { useState } from 'react';
// import styles from './DailyCaloriesForm.module.css';

const DailyCaloriesForm = () => {
  const [formData, setFormData] = useState({
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Height* <input type="number" name="height" required onChange={handleChange} /></label>
        <label>Age* <input type="number" name="age" required onChange={handleChange} /></label>
        <label>Current weight* <input type="number" name="currentWeight" required onChange={handleChange} /></label>
      </div>
      <div>
        <label>Desired weight* <input type="number" name="desiredWeight" required onChange={handleChange} /></label>
        <label>Blood type*
          <select name="bloodType" onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
      </div>
      <button type="submit">Start losing weight</button>
    </form>
  );
};

export default DailyCaloriesForm;
