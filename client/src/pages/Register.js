import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skillsOffered: '',
    skillsWanted: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, skillsOffered, skillsWanted } = formData;
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        skillsOffered: skillsOffered.split(','), // Convert comma-separated string to array
        skillsWanted: skillsWanted.split(','),  // Convert comma-separated string to array
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error registering user!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Skills You Offer (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            name="skillsOffered"
            value={formData.skillsOffered}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Skills You Want to Learn (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            name="skillsWanted"
            value={formData.skillsWanted}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
