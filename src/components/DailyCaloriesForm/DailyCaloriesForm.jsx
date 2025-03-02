import React, { useState } from 'react';
import "./DailyCaloriesForm.css"


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
        <input type="text" className="input-bottom-border" disabled />
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
  );
};

export default DailyCaloriesForm;
