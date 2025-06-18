import React, { useState } from 'react';
import axios from '../api/axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/users/login', formData);
      localStorage.setItem('token', data.token);
      alert('Login successful');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="form-container shadow">
        <h2 className="form-title text-center">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="form-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
