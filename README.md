# Book Management Library API

This is a RESTful API built using Node.js, Express.js, TypeScript, and MongoDB (via Mongoose) to manage a library of books and borrow records. It supports book CRUD operations, borrowing system, filtering by genre, sorting, limiting results, and borrow summary using aggregation.

---

## Features

- Full Create, Read, Update, Delete (CRUD) for books
- Borrow books with quantity and due date tracking
- Filter books by genre
- Sort books by any field (title, createdAt, etc.)
- Limit results via query
- Borrowed books summary with aggregation
- Validations and error handling
- Duplicate ISBN error handling
- Timestamp for createdAt and updatedAt

---

## Technologies Used

Node.js, Express.js, TypeScript, MongoDB, Mongoose, Dotenv, Nodemon

---

## Getting Started

To run this project locally:

1. Clone the project:


Server will run on: `http://localhost:5000`

---

## API Endpoints

### GET /api/books

Get all books with optional filtering, sorting, and limiting.

Query Parameters:
- `filter`: Filter by genre (e.g., SCIENCE)
- `sortBy`: Sort field (e.g., createdAt)
- `sort`: asc or desc
- `limit`: Limit number of results

Example:

GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

---

### POST /api/books

Create a new book.

Request Body:

{ "title": "The Theory of Everything", "author": "Stephen Hawking", "genre": "SCIENCE", "isbn": "9780553380165", "description": "An overview of cosmology and black holes.", "copies": 5 }

---

### POST /api/borrows

Borrow a book.

Request Body:

{ "book": "60f1a4e8fc13ae5c30000001", "quantity": 2, "dueDate": "2025-07-10" }

---

### GET /api/borrows

Returns borrowed books summary using aggregation.

Sample Response:

{ "success": true, "data": [ { "book": { "title": "The Theory of Everything", "isbn": "9780553380165" }, "totalQuantity": 5 } ] }

---

## Validation Rules

- title: required
- author: required
- genre: required, must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
- isbn: required, unique
- description: optional
- copies: required, number ≥ 0
- available: default true

Borrow Schema:
- book: ObjectId (required)
- quantity: number ≥ 1
- dueDate: valid date, required

---

## Validation Messages

- "Title is required."
- "ISBN must be unique."
- "Copies must be a positive number."
- "Genre must be one of: SCIENCE, FICTION, FANTASY..."

---

## Aggregation Logic (GET /api/borrows)

1. Group borrow records by book ID  
2. Sum total quantity  
3. Lookup book details from Book collection  
4. Return book title, isbn, and total quantity in response

---




