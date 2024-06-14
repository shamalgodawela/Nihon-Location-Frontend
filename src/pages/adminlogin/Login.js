import React, { useState, useEffect } from 'react';
import './login.css';
import axios from 'axios';

const Login = () => {
  const [formClass, setFormClass] = useState('');
  const [eyeStyle, setEyeStyle] = useState({ width: '0px', height: '0px' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleMouseMove = (event) => {
      const dw = window.innerWidth / 15;
      const dh = window.innerHeight / 15;
      const x = event.pageX / dw;
      const y = event.pageY / dh;
      setEyeStyle({ width: `${x}px`, height: `${y}px` });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleFocusIn = () => {
    setFormClass('up');
  };

  const handleFocusOut = () => {
    setFormClass('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://location-app-api.onrender.com/api/login', { email, password });

      const token = response.data.token;
      localStorage.setItem('token', token);

      window.location.href = '/getalllocation';
    } catch (error) {
      if (error.response.status === 401) {
        alert('invalid password or email')
        setFormClass('wrong-entry');
        setErrorMessage('Invalid credentials');
        setTimeout(() => {
          setFormClass('');
          setErrorMessage('');
        }, 3000);
      } else {
        console.error('Login error:', error.message);
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };
  return (
    <div className='body-login'>
    <div className="panda-login-container">
      <div className="panda">
        <div className="ear"></div>
        <div className="face">
          <div className="eye-shade"></div>
          <div className="eye-white">
            <div className="eye-ball" style={eyeStyle}></div>
          </div>
          <div className="eye-shade rgt"></div>
          <div className="eye-white rgt">
            <div className="eye-ball" style={eyeStyle}></div>
          </div>
          <div className="nose"></div>
          <div className="mouth"></div>
        </div>
        <div className="body"></div>
        <div className="foot">
          <div className="finger"></div>
        </div>
        <div className="foot rgt">
          <div className="finger"></div>
        </div>
      </div>
      <form className={formClass} onSubmit={handleSubmit}>
        <div className="hand"></div>
        <div className="hand rgt"></div>
        <h1>Admin Login</h1>
        <div className="form-group">
          <input
            required
            className="form-control"
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label">Email</label>
        </div>
        <div className="form-group">
          <input
            id="password"
            type="password"
            required
            className="form-control"
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form-label">Password</label>
          <p className="alert">{errorMessage}</p>
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Login;
