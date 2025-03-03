import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';
import Header from '../Header/Header';
import Background from '../Background/Background';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError('All fields are required.');
      return false;
    }

    if (!email.includes('@')) {
      setError('Email must contain @.');
      return false;
    }

    if (password.length < 6 || !/[A-Z]/.test(password)) {
      setError('Password must be at least 6 characters long and contain one uppercase letter.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!validateForm()) return;
  
    try {
      const response = await axios.post('http://localhost:5000/users/register', formData);
  
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to register.';
      setError(errorMessage);
    }
  };
  

  return (
    <div>
        <Header/>
        <Background/>
      <h2 className="login-title">REGISTRATION</h2>
      
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form-data">
        <label>Name*
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>Email*
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>Password*
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <div className='buttons'>
          <button type="submit" className="login-btn">Register</button>
          <button type="button" className="register-btn" onClick={() => navigate('/login')}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
