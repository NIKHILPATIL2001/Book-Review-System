# Book Review System

##  Project Setup

### 1. Clone the Repository

git clone https://github.com/yourusername/book-review-system.git
cd book-review-system

### 2. Install Dependencies

npm install

### 3. Create .env File

In the root directory, create a `.env` file and add the following variables:

PORT=3000
SECRET_KEY=your_jwt_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=book_review_db



##  Setup MySQL Database

1. Open your MySQL client and run:

CREATE DATABASE book_review_db;

2. (Optional) Run the SQL scripts provided in `db/schema.sql` and `db/seed.sql` to create tables and insert sample data.



##  Running Locally

Start the development server:

npm start

App will be running at:
http://localhost:3000


## Authentication APIs

### Signup

curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"username":"testuser","password":"mypassword"}'

### Login

curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"testuser","password":"mypassword"}'

### Response

{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}

Use the token in Authorization headers as:

Authorization: Bearer <JWT_TOKEN>


## Book APIs

###  Add Book (Requires Auth)

curl -X POST http://localhost:3000/api/books \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"title":"History of India","author":"John Smith","genre":"History"}'

###  Get All Books (With Optional Filters)

curl "http://localhost:3000/api/books?author=John%20Smith&genre=History&page=1&limit=5"

### Get Book Details by ID

curl http://localhost:3000/api/books/3

### Search Books by Title

curl "http://localhost:3000/api/books/search/title?query=history"



##  Review APIs

###  Submit Review (Requires Auth)

curl -X POST http://localhost:3000/api/books/3/reviews \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"rating":5,"comment":"Excellent book!"}'

### Update Review (Requires Auth)

curl -X PUT http://localhost:3000/api/reviews/10 \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"rating":4,"comment":"Updated review"}'

### Delete Review (Requires Auth)

curl -X DELETE http://localhost:3000/api/reviews/10 \
-H "Authorization: Bearer <JWT_TOKEN>"



