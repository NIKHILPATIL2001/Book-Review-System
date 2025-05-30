const { db, queries }=  require('../db_config/db_connect.js')

const addBook = (req, res) => {
    const { title, author, genre } = req.body;
    db.query("INSERT INTO tbl_books (title, author, genre) VALUES (?, ?, ?)", [title, author, genre], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Book added successfully' });
    });
};

const getBooks = (req, res) => {
    const { author, genre, page = 1, limit = 10 } = req.query;
    let query = "SELECT * FROM tbl_books WHERE 1=1";
    const params = [];
    if (author) {
        query += " AND author LIKE ?";
        params.push(`%${author}%`);
    }
    if (genre) {
        query += " AND genre LIKE ?";
        params.push(`%${genre}%`);
    }
    query += " LIMIT ? OFFSET ?";
    params.push(parseInt(limit), (page - 1) * limit);

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

const getBookDetails = (req, res) => {
    const bookId = req.params.id;
    db.query(`SELECT b.*, AVG(r.rating) as avgRating FROM tbl_books b LEFT JOIN tbl_reviews r ON b.id = r.book_id WHERE b.id = ?`, [bookId], (err, bookResults) => {
        if (err) return res.status(500).json({ error: err });

        db.query(`SELECT * FROM tbl_reviews WHERE book_id = ?`, [bookId], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ book: bookResults[0], reviews: reviewResults });
        });
    });
};

const searchBooks = (req, res) => {
    const query = req.query.query;
    db.query("SELECT * FROM tbl_books WHERE title LIKE ? OR author LIKE ?", [`%${query}%`, `%${query}%`], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

module.exports = { addBook, getBooks, getBookDetails, searchBooks };
