import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const currentUser = {
    fullName: 'Nabaraj Acharya',
    email: 'nabraj345@gmail.com',
    contact: '7480859204'
  };

  const selectedSeats = [
    { seat_label: '13F', seat_class: 'Economy Class', prices: { 'economy-class': 180 } }
  ];

  const ticketId = 'T123456';
  const selectedDate = new Date();

  const destination = 'London, UK';
  const TotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatClass = seat.seat_class.toLowerCase().replace(/\s+/g, '-');
      return total + (seat.prices[seatClass] || 0);
    }, 0);
  };

  const totalPrice = TotalPrice();

  const handlePay = () => {
    setShowDialog(true);
  };

  const toDashboard = () => {
    navigate('/');
  };

  return (
    <div className="checkout-container">

      <div className="customer-info">
        <h4 className="font-large">Passenger Information</h4>
        <div className="form-group">
          <label htmlFor="fullName" className="font-large">Full Name: {currentUser.fullName}</label>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="font-large">Email: {currentUser.email}</label>
        </div>
        <div className="form-group">
          <label htmlFor="contact" className="font-large">Contact No: {currentUser.contact}</label>
        </div>
      </div>
      <div className="booking-summary">
        <h4 className="font-large">Ticket</h4>
        <div className="card">
          <div className="card-body">
            <h5 className="font-large">Selected Seats</h5>
            <ul className="seat-list">
              {selectedSeats.map((seat, index) => (
                <li key={index} className="font-large">
                  <strong>{seat.seat_label}</strong> - {seat.seat_class}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="font-large">Selected Date</h5>
            <p className="font-large">{selectedDate.toISOString().split('T')[0]}</p>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="font-large">Destination</h5>
            <p className="font-large">{destination}</p>
          </div>
        </div>
      </div>
      <div className="total-price">
        <div className="card">
          <div className="card-body">
            <h5 className="font-large">Total Price</h5>
            <p className="font-large">Your total price is <strong>${totalPrice.toFixed(2)}</strong>.</p>
            <button className="btn btn-primary btn-block" onClick={handlePay}>Confirm</button>
          </div>
        </div>
      </div>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h4 className="font-large">Ticket </h4>
            <p className="font-large">Your ticket ID is <strong>{ticketId}</strong></p>
            <div className="customer-details">
              <p className="font-large"><strong>Passenger Name:</strong> {currentUser.fullName}</p>
              <p className="font-large"><strong>Email:</strong> {currentUser.email}</p>
              <p className="font-large"><strong>Contact No:</strong> {currentUser.contact}</p>
            </div>
            <div className="booking-details">
              <h5 className="font-large">Booking Details</h5>
              <p className="font-large"><strong>Destination:</strong> {destination}</p>
              <p className="font-large"><strong>Date:</strong> {selectedDate.toISOString().split('T')[0]}</p>
              <h5 className="font-large">Selected Seats</h5>
              <ul className="seat-list">
                {selectedSeats.map((seat, index) => (
                  <li key={index} className="font-large">
                    <strong>{seat.seat_label}</strong> - {seat.seat_class}
                  </li>
                ))}
              </ul>
              <p className="font-large"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="dialog-buttons">
              <button className="btn btn-primary" onClick={toDashboard}>Home</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
