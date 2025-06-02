
-- Create the database
CREATE DATABASE IF NOT EXISTS book_review_db;
USE book_review_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT,
  user_id INT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample users (use hashed passwords in production)
INSERT INTO users (username, password) VALUES
('testuser1', 'hashed_password1'),
('testuser2', 'hashed_password2');

-- Insert sample books
INSERT INTO books (title, author, genre) VALUES
('History of India', 'John Smith', 'History'),
('Learning JavaScript', 'Jane Doe', 'Programming'),
('World War II', 'Tom Hanks', 'History'),
('Node.js in Action', 'Mike Lee', 'Technology');

-- Insert sample reviews
INSERT INTO reviews (book_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Excellent book!'),
(2, 1, 4, 'Very informative'),
(3, 2, 3, 'Good read but a bit dry');
