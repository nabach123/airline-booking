import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/homePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleStartBooking = () => {
        navigate('/booking');
    };

    const handleManageBooking = () => {
        navigate('/manage-booking');
    };

    return (
        <div className="homepage-container">
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
                        <ul className="navbar-nav ml-auto justify-content-end " >

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
            <header className="homepage-header">
                <div className="header-content">
                    <h1>Welcome to Ealing Airline Booking Service</h1>
                    <p>Embark on your journey with us</p>
                    <button className="btn btn-primary" onClick={handleStartBooking}>Start Booking</button>
                    <button className="btn btn-secondary" onClick={handleManageBooking}>Manage Booking</button>
                </div>
            </header>
            <section className="homepage-features">
                <h2 className="features-heading">Why Choose Ealing Airline Booking Service?</h2>
                <div className="feature">
                    <i className="fas fa-plane-departure"></i>
                    <h3>Convenience and Ease of Booking</h3>
                    <p>Enjoy the convenience of booking your flights hassle-free from the comfort of your home or on-the-go.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-clock"></i>
                    <h3>Flexibility in Travel Plans</h3>
                    <p>While we currently offer a limited number of flights, Sky Explorer ensures flexibility in your travel plans. Choose from available options that best suit your preferences and schedule.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-headset"></i>
                    <h3>24/7 Customer Support</h3>
                    <p>Receive round-the-clock customer support from experienced representatives dedicated to ensuring your travel experience is seamless.</p>
                </div>
            </section>
            <section className="customer-reviews">
                <h2 className="reviews-heading">Customer Reviews</h2>
                <div className="review">
                    <p>"Airline Booking System made my travel experience seamless and stress-free. Highly recommend!" - Andy Ghimire</p>
                </div>
                <div className="review">
                    <p>"Excellent customer service and great deals. I always book my flights with Sky Explorer." - Nitu Thapa</p>
                </div>
                <div className="review">
                    <p>"Booking was so easy and the support team was very helpful. Will definitely use again!" - Nonika Karke</p>
                </div>
            </section>
            <section className="our-destinations">
                <h2 className="destinations-heading">Our Destinations</h2>
                <div className="destination">
                    <h3>Manchester, UK</h3>
                    <p>Explore the vibrant city of Manchester, known for its rich industrial heritage, world-class football, and lively music scene.</p>
                </div>
                <div className="destination">
                    <h3>Edinburgh, Scotland</h3>
                    <p>Discover the historic capital of Scotland, with its stunning architecture, ancient castles, and picturesque landscapes.</p>
                </div>
                <div className="destination">
                    <h3>London, UK</h3>
                    <p>Experience the dynamic city of London, home to iconic landmarks, cultural diversity, and endless entertainment options.</p>
                </div>
            </section>

            <footer className="homepage-footer">
                <p>&copy; 2024 Ealing Airline Booking Service. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
