const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'ealing-service',
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        process.exit(1);
    } else {
        console.log('MySQL connected');
    }
});

// Route to get all seats
app.get('/seats', (req, res) => {
    db.query('SELECT * FROM Seats', (err, results) => {
        if (err) {
            console.error('Error fetching seats', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        console.log(`Attempting login for username: ${username}`);

        const results = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (results.length === 0) {
            console.log(`No user found with username: ${username}`);
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        console.log(`User found: ${user.username}, comparing passwords...`);

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            console.log('Password match, login successful');
            return res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, full_name: user.full_name } });
        } else {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post('/book-seats', (req, res) => {
    const { seats } = req.body;

    if (!seats || !seats.length) {
        return res.status(400).json({ message: 'No seats provided' });
    }

    const seatIds = seats.map(seat => seat.id);
    console.log('Attempting to book seats with IDs:', seatIds);

    db.query(
        'SELECT * FROM seats WHERE id IN (?) AND status = "available"',
        [seatIds],
        (err, results) => {
            if (err) {
                console.error('Error querying seats:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length !== seatIds.length) {
                console.log('Some seats are not available:', seatIds);
                return res.status(400).json({ message: 'Some seats are not available' });
            }

            db.query(
                'UPDATE seats SET status = "booked" WHERE id IN (?)',
                [seatIds],
                (err) => {
                    if (err) {
                        console.error('Error updating seats:', err);
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                    console.log('Seats booked successfully:', seatIds);
                    res.json({ message: 'Seats booked successfully', seats: seatIds });
                }
            );
        }
    );
});

app.post('/register', async (req, res) => {
    const { username, password, fullName, email, phone_number, address, passport } = req.body;

    if (!username || !password || !fullName || !email || !phone_number || !address || !passport) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (username, password, full_name, email, phone_number, address, passport) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [username, hashedPassword, fullName, email, phone_number, address, passport],
            (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ message: 'Username already exists' });
                    }
                    throw err;
                }
                console.log(`User ${username} registered successfully`);
                res.status(201).json({ message: 'User registered successfully', user: { id: results.insertId, username, fullName, email, phone_number, address, passport } });
            }
        );
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
