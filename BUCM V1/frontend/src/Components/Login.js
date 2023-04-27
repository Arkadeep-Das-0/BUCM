import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [gsuit, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(gsuit, password);
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gsuit, password }),
      });
  
      console.log(response);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
  
      if (data.success) {
        navigate('/'); // Redirect to home after successful login
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  

  return (
    <section className="login">
      <div className="container mt-5">
        <div className="login-content">
          <div className="login-form">
            <h2 className="form-title">Login</h2>
            <form method="POST" className="login-form" id="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Email"
                  value={gsuit}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group form-button">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
