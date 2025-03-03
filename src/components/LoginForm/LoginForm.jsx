import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Background from '../Background/Background';
import Header from '../Header/Header';

const LoginForm = ({ setActivePage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validări
    if (!email.includes('@')) {
      setError('Email-ul trebuie să conțină "@"');
      return;
    }
    if (password.length < 6 || !/[A-Z]/.test(password)) {
      setError('Parola trebuie să aibă cel puțin 6 caractere și o literă mare.');
      return;
    }

    // Simulăm login-ul (în practică, ar trebui să trimiți datele către backend)
    console.log('Logging in:', { email, password });
    navigate('/diary');
  };

  return (
    <div>    
    <Header/>
    <Background/>
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
        </form>
          <button type="submit" className="login-btn">Log in</button>
          <button type="button" className="register-btn" onClick={() => navigate('/register')}>Register</button>
    </div>
    </div>
  );
};

export default LoginForm;
