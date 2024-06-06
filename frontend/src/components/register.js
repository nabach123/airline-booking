import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone_number: '',
    address: '',
    passport: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats, prices, selectedDate } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/register`, form);
      if (response.status === 201) {
        alert(handleSubmit);
        onRegister(response.data.user);
        navigate('/login', { state: { selectedSeats, prices, selectedDate } });
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      setError('Registration failed: ' + (error.response ? error.response.data : error.message));
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login', { state: { selectedSeats, prices, selectedDate } });
  };

  const renderFormField = (label, name, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={form[name]}
        onChange={handleChange}
        required
        placeholder={placeholder}
        style={{ borderColor: '#ced4da' }}
      />
    </div>
  );

  return (
    <div className="register-container" style={{ backgroundColor: '#f8f9fa' }}>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'white' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {/* Your brand/logo */}
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ fontSize: '2.5rem', color: 'green' }}>Ealing Airline Booking System</a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto justify-content-end">
              <li className="nav-item" style={{ paddingLeft: '1000px' }}>
                <a className="nav-link" href="#" style={{ fontSize: '2rem', color: 'green' }}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ fontSize: '2rem', color: 'green' }}>Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ fontSize: '2rem', color: 'green' }}>Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ fontSize: '2rem', color: 'green' }}>Manage Booking</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ fontSize: '2rem', color: 'green' }}>
                  My Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Profile</a>
                  <a className="dropdown-item" href="#">Settings</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Logout</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ fontSize: '1.5rem', color: 'green' }}>
                  <i className="fa fa-shopping-cart"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ fontSize: '1.5rem', color: 'green' }}>
                  <i className="fa fa-bell"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#343a40' }}>User Registration</h2>
        <form onSubmit={handleSubmit}>
          {renderFormField('Username', 'username', 'text', 'Enter your username')}
          {renderFormField('Password', 'password', 'password', 'Enter your password')}
          {renderFormField('Full Name', 'fullName', 'text', 'Enter your full name')}
          {renderFormField('Email', 'email', 'email', 'Enter your email')}
          {renderFormField('Phone Number', 'phone_number', 'text', 'Enter your phone number')}
          {renderFormField('Address', 'address', 'text', 'Enter your address')}
          {renderFormField('Passport', 'passport', 'text', 'Enter your passport number')}
          <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Register</button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="login-link mt-3" style={{ textAlign: 'center' }}>
          <p>
            Already registered? <button onClick={handleLoginRedirect} className="btn btn-link" style={{ color: '#007bff' }}>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
