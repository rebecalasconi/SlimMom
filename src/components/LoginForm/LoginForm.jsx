import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';
import Background from '../Background/Background';
import Header from '../Header/Header';

const LoginForm = ({ setActivePage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');


    if (!email.includes('@')) {
      setError('Email-ul trebuie să conțină "@"');
      return;
    }
    if (password.length < 6 || !/[A-Z]/.test(password)) {
      setError('Parola trebuie să aibă cel puțin 6 caractere și o literă mare.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.user.name)
        navigate('/calculator');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Eroare la autentificare.';
      setError(errorMessage);
    }
  };

  return (
    <div className='login-container'>    
      <Header /> 
      <div className="login-form">
        <h2 className="login-title">LOG IN</h2>
        {error && <p className="error">{error}</p>}
        <form className="form-data" onSubmit={handleSubmit}>
          <label>
            Email*
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password*
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <div className='buttons'>  
            <button type="submit" className="login-btn">Log in</button>
          <button type="button" className="register-btn" onClick={() => navigate('/register')}>Register</button>
          </div>
        </form>
      </div>
      <div className="login-background">
      <Background/>
      </div> 
    </div>
  );
};

export default LoginForm;
