import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
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
      const response = await axios.post('http://localhost:5001/login', form);
      if (response.status === 200 && response.data.message === 'Successfully Login') {
        const user = response.data.user;
        console.log('Login successful:', user);
        alert('Login successful');
        onLogin(user);
        navigate('/checkout', { state: { selectedSeats, prices, selectedDate, currentUser: user } });
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('Invalid username or password');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register', { state: { selectedSeats, prices, selectedDate } });
  };

  return (
    <div>
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

        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#343a40' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Login</button>
        </form>
        <div className="login-link mt-3" style={{ textAlign: 'center' }}>
          <p>
            <button onClick={''} className="btn btn-link" style={{ color: '#007bff' }}>Forget Password?</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
