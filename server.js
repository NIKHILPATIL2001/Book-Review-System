// const express = require('express');
// const jwt = require('jsonwebtoken');
// const { db, queries }=  require('./db_config/db_connect')
// const dotenv =  require('dotenv')
// const route = require('./route/route.js');
// const app = express();


// dotenv.config()

// app.use(express.json());

// const SECRET_KEY = process.env.sercet_key; // Replace with your own secret key

// app.post("/signup", (req, res) => {
//     const username = req.body.username;
//     const pass = req.body.password;

//     db.query(queries.insertUserData, [username, pass], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error inserting user', error: err });
//         }
   
//         const payload = { username: username };
//         const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
//         res.status(200).json({ message: 'Signup successful', token: token });
//     });

    
// });



// app.use('/api/book', route);

// app.post("/login", (req, res) => {
//     const username = req.body.username;
//     const pass = req.body.password;
//      db.query(queries.viewUserData, [username, pass], (err, results) => {
//         if (err) return res.status(500).json({ message: 'Error during login', error: err });

//         if (results.length > 0) {
//             const payload = { username: username };
//             const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
//             res.json({ message: 'Login successful', token: token });
//         } else {
//             res.status(401).json({ message: 'Invalid username or password' });
//         }
//     });
// });




// const port = 3000;
// app.listen(port, () => {
//     console.log("Server running on port", port);
// });



const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const authRoutes = require('./route/authroute.js');
const bookRoutes = require('./route/bookroute.js');

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
// app.use('/user',route)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
