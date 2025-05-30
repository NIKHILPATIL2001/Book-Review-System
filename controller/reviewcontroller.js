const { db, queries }=  require('../db_config/db_connect.js')

const submitReview = (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.id;
    const { rating, comment } = req.body;

    db.query("SELECT * FROM tbl_reviews WHERE user_id = ? AND book_id = ?", [userId, bookId], (err, results) => {
        if (results.length > 0) return res.status(400).json({ message: 'Review already submitted' });

        db.query("INSERT INTO tbl_reviews (user_id, book_id, rating, comment) VALUES (?, ?, ?, ?)", [userId, bookId, rating, comment], (err) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'Review submitted' });
        });
    });
};

const updateReview = (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    db.query("UPDATE tbl_reviews SET rating = ?, comment = ? WHERE id = ? AND user_id = ?", [rating, comment, reviewId, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Review updated' });
    });
};

const deleteReview = (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.id;

    db.query("DELETE FROM tbl_reviews WHERE id = ? AND user_id = ?", [reviewId, userId], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Review deleted' });
    });
};


module.exports = { submitReview, updateReview, deleteReview };