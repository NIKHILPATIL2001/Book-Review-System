const { db, queries }=  require('../db_config/db_connect.js')
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.sercet_key;

const signup = (req, res) => {
    const { username, password } = req.body;
    db.query(queries.insertUserData, [username, password], (err) => {
        if (err) return res.status(500).json({ error: err });
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Signup successful', token });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;
    db.query(queries.viewUserData, [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length > 0) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
};

module.exports = { signup, login };