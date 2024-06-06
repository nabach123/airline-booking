import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './bookingForm';
import SeatingPlanViewer from './seatingPlanViewer';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const dateToPricesMap = {
    '2024-05-20': { 'first-class': 510, 'business-class': 350, 'economy-class': 120 },
    '2024-05-21': { 'first-class': 500, 'business-class': 370, 'economy-class': 140 },
    '2024-05-22': { 'first-class': 650, 'business-class': 290, 'economy-class': 130 },
    '2024-05-23': { 'first-class': 720, 'business-class': 400, 'economy-class': 200 },
    '2024-05-24': { 'first-class': 590, 'business-class': 370, 'economy-class': 180 }
};
const DateSelector = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className="date-selector">
            <h4>Select a Date</h4>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                minDate={new Date()}
            />
        </div>
    );
};

const TicketPrice = ({ prices }) => {
    return (
        <div className="ticket-price">
            <br></br>
            <h4>Ticket Prices:</h4>
            <div className="row">
                <div className="col-md-4">
                    <div className="p-3 border bg-light">
                        <h5>First Class</h5>
                        <p>${prices['first-class']}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 border bg-light">
                        <h5>Business Class</h5>
                        <p>${prices['business-class']}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 border bg-light">
                        <h5>Economy Class</h5>
                        <p>${prices['economy-class']}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};


function BookingPage({ currentUser, selectedSeats, setSelectedSeats }) {

    const [fromDestination, setFromDestination] = useState('');
    const [toDestination, setToDestination] = useState('');
    const [layout, setLayout] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [showNoSeatsDialog, setShowNoSeatsDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentPrices, setCurrentPrices] = useState(dateToPricesMap['2024-05-20']);
    const [lockedSeats, setLockedSeats] = useState([]);
    const [groupSize, setGroupSize] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5001/seats')
            .then(response => {
                const fetchedSeats = response.data;
                const transformedLayout = transformSeatsToLayout(fetchedSeats);
                setLayout(transformedLayout);
            })
            .catch(error => {
                console.error('There was an error fetching the seats!', error);
            });
    }, []);

    useEffect(() => {
        const selectedDateString = selectedDate.toISOString().split('T')[0];
        setCurrentPrices(dateToPricesMap[selectedDateString] || dateToPricesMap['2024-05-20']);
    }, [selectedDate]);

    const transformSeatsToLayout = (seats) => {
        const layout = [];
        seats.forEach(seat => {
            const row = seat.seat_row - 1;
            const col = seat.seat_col - 1;
            if (!layout[row]) {
                layout[row] = [];
            }
            layout[row][col] = seat;
        });
        return layout;
    };

    const manageSeatClick = (rowIndex, seatIndex) => {
        if (selectedSeats.length >= 6) {
            alert('You are not allowed to reserve more than 6 seats at a time.');
            return;
        }

        const seat = layout[rowIndex][seatIndex];
        if (seat.status === 'available') {
            const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));

            if (singleGap(updatedLayout, rowIndex, seatIndex)) {
                alert('Choose a different seat to avoid creating a single gap.');
                return;
            }

            updatedLayout[rowIndex][seatIndex].status = 'selected';
            setLayout(updatedLayout);
            const updatedSelectedSeats = [...selectedSeats, { ...seat, rowIndex, seatIndex }];
            console.log('Updated Selected Seats:', updatedSelectedSeats); // Log updated selected seats
            setSelectedSeats(updatedSelectedSeats);
        } else if (seat.status === 'selected') {
            const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));
            updatedLayout[rowIndex][seatIndex].status = 'available';
            setLayout(updatedLayout);
            const updatedSelectedSeats = selectedSeats.filter(s => s.rowIndex !== rowIndex || s.seatIndex !== seatIndex);
            console.log('Updated Selected Seats:', updatedSelectedSeats); // Log updated selected seats
            setSelectedSeats(updatedSelectedSeats);
        }
    };

    const singleGap = (layout, rowIndex, seatIndex) => {
        const row = layout[rowIndex];
        if (seatIndex > 0 && row[seatIndex - 1].status === 'available') {
            if ((seatIndex >= 2 && row[seatIndex - 2].status !== 'available') || (seatIndex < 2)) {
                return true;
            }
        }

        if (seatIndex < row.length - 1 && row[seatIndex + 1].status === 'available') {
            if ((seatIndex + 2 < row.length && row[seatIndex + 2].status !== 'available') || (seatIndex + 2 >= row.length)) {
                return true;
            }
        }

        return false;
    };

    const detectContineousBlocks = (layout, groupSize, selectedClass) => {
        const blocks = [];
        layout.forEach((row, rowIndex) => {
            let count = 0;
            let start = -1;
            row.forEach((seat, seatIndex) => {
                if (seat.status === 'available' && seat.seat_class === selectedClass) {
                    if (start === -1) {
                        start = seatIndex;
                    }
                    count++;
                } else {
                    if (count >= groupSize) {
                        blocks.push({ rowIndex, start, count });
                    }
                    count = 0;
                    start = -1;
                }
            });
            if (count >= groupSize) {
                blocks.push({ rowIndex, start, count });
            }
        });
        return blocks;
    };

    const handleGroupBooking = (groupSize) => {
        if (groupSize < 2 || groupSize > 6) {
            alert('Group size: min 2, max 6 seats.');
            return;
        }

        if (selectedSeats.length + groupSize > 6) {
            alert('You cannot book more than 6 seats at once.');
            return;
        }

        if (selectedClass === '') {
            alert('Please select a class for group booking.');
            return;
        }

        const blocks = detectContineousBlocks(layout, groupSize, selectedClass);
        if (blocks.length === 0) {
            alert('No adjacent seats available for this group size.');
            return;
        }

        const selectedBlock = blocks[0];
        const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));
        for (let i = 0; i < groupSize; i++) {
            updatedLayout[selectedBlock.rowIndex][selectedBlock.start + i].status = 'selected';
        }

        setLayout(updatedLayout);
        setSelectedSeats([
            ...selectedSeats,
            ...Array.from({ length: groupSize }, (_, i) => ({
                ...updatedLayout[selectedBlock.rowIndex][selectedBlock.start + i],
                rowIndex: selectedBlock.rowIndex,
                seatIndex: selectedBlock.start + i
            }))
        ]);
    };

    const beginSignIn = () => {
        if (selectedSeats.length === 0) {
            alert('Please choose a seat before proceeding to checkout.');
            return;
        }

        const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));
        selectedSeats.forEach(({ rowIndex, seatIndex }) => {
            updatedLayout[rowIndex][seatIndex].status = 'locked';
        });

        setLayout(updatedLayout);
        setLockedSeats([...lockedSeats, ...selectedSeats]);

        axios.post('http://localhost:5001/book-seats', { seats: selectedSeats })
            .then(response => {
                console.log('Booking response:', response.data);
                setSelectedSeats([]);
                navigate('/register', { state: { selectedSeats, prices: currentPrices, currentUser, selectedDate } });
            })
            .catch(error => {
                console.error('There was an error booking the seats!', error);
                alert('Failed to book seats. Please try again later.');
            });
    };


    const cancelBooking = () => {
        window.location.reload();
    };

    const handleCloseDialog = () => {
        setShowNoSeatsDialog(false);
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
            <main>
                <div className="centered-container">

                    <div className="row" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="col-md-6" >
                            <p className="text-center mb-3 font-weight-bold" style={{ fontSize: '1.5rem' }}>Select your preferred seats below:</p>
                            <SeatingPlanViewer layout={layout} onSeatClick={manageSeatClick} />
                            {showNoSeatsDialog && (
                                <div className="dialog-overlay">
                                    <div className="dialog">
                                        <p>No seats available in the selected class.</p>
                                        <button className="btn btn-primary" onClick={handleCloseDialog}>Close</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <div className="ticket-info mb-4 p-4" style={{ border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                                <label htmlFor="fromDestination" className="font-weight-bold" style={{ fontSize: '1.6rem' }}>From:</label>
                                <select
                                    id="fromDestination"
                                    value={fromDestination}
                                    className="form-control mb-4"
                                    style={{ fontSize: '1.2rem' }}
                                    onChange={(e) => setFromDestination(e.target.value)}
                                >
                                    <option value="">Select Departure</option>
                                    <option value="Manchester">Manchester, UK</option>
                                    <option value="Edinburgh">Edinburgh, Scotland</option>
                                    <option value="London">London, UK</option>
                                    {/* Add more departure locations as needed */}
                                </select>
                                <label htmlFor="toDestination" className="font-weight-bold" style={{ fontSize: '1.6rem' }}>To:</label>
                                <select
                                    id="toDestination"
                                    value={toDestination}
                                    className="form-control mb-4"
                                    style={{ fontSize: '1.2rem' }}
                                    onChange={(e) => setToDestination(e.target.value)}
                                >
                                    <option value="">Select Destination</option>
                                    <option value="Manchester">Manchester, UK</option>
                                    <option value="Edinburgh">Edinburgh, Scotland</option>
                                    <option value="London">London, UK</option>
                                    {/* Add more destinations as needed */}
                                </select>
                                <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                <TicketPrice prices={currentPrices} />
                            </div>

                            <div className="booking-actions mb-4 p-4" style={{ border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                                <BookingForm bookingDetails={selectedSeats} />
                            </div>
                            <div className="group-booking mb-4 p-4" style={{ border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                                <label htmlFor="groupSize" className="font-weight-bold" style={{ fontSize: '1.6rem' }}>Group Size:</label>
                                <input
                                    type="number"
                                    id="groupSize"
                                    min="1"
                                    max="6"
                                    value={groupSize}
                                    className="form-control mb-3"
                                    style={{ fontSize: '1.2rem' }}
                                    onChange={(e) => setGroupSize(parseInt(e.target.value))}
                                />
                                {groupSize > 1 && (
                                    <>
                                        <label htmlFor="selectedClass" className="mt-2 font-weight-bold" style={{ fontSize: '1.6rem' }}>Class:</label>
                                        <div className="form-group">
                                            <select
                                                id="selectedClass"
                                                value={selectedClass}
                                                className="form-control mb-3"
                                                style={{ fontSize: '1.2rem' }}
                                                onChange={(e) => setSelectedClass(e.target.value)}
                                            >
                                                <option value="">Select Class</option>
                                                <option value="first-class">Business: $500</option>
                                                <option value="business-class">Premium: $300</option>
                                                <option value="economy-class">Economy: $100</option>
                                            </select>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-block btn-primary mt-3" style={{ fontSize: '1.2rem' }} onClick={() => handleGroupBooking(groupSize)}>Book Group</button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="checkout-buttons mb-4 p-4" style={{ border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-success mb-3" style={{ flex: '1 1 0', marginRight: '1rem', fontSize: '1.2rem', minWidth: '150px' }} onClick={beginSignIn}>Sign In to Continue</button>
                                    <button className="btn btn-danger mb-3" style={{ flex: '1 1 0', marginLeft: '1rem', fontSize: '1.2rem', minWidth: '150px' }} onClick={cancelBooking}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>





    );
}

export default BookingPage;


