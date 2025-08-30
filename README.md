MyELib – Backend (Library Management System)
Project Overview

This is the backend API for MyELib, a Library Management System.
It manages books, borrowers, and transactions history (issue/return).

Features:

Book Management – Add, update, delete, view books

Borrower Management – Register and manage library members

Issue & Return – Track which books are borrowed


Tech Stack

Node.js + Express.js – API server

MongoDB + Mongoose – Database

REST API – JSON-based endpoints

Prerequisites

Install these first:

Node.js

MongoDB

Git

Quick Start

1️ Clone the Project
git clone https://github.com/manjilaShrestha/libraryManagement.git
cd backend

2 Install Dependencies
npm install

3️ Setup Environment

Create a .env file inside backend:

PORT=5000
MONGO_URI=mongodb:mongodb+srv://manjilashrestha366:MANJILA@cluster0.rydflxr.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0

4️ Start MongoDB

Make sure MongoDB is running:




Backend API will run at http://localhost:5000

 API Endpoints (Backend)
BORROWER Management
Method	Endpoint	Description

POST	
http://localhost:5000/api/auth/register
http://localhost:5000/api/auth/login
http://localhost:5000/api/borrow
http://localhost:5000/api/borrow/return
http://localhost:5000/api/auth/send-message

GET	
http://localhost:5000/api/borrow/my-borrows


Librarian Management
Method	Endpoint	Description



POST
http://localhost:5000/api/auth/register
http://localhost:5000/api/auth/login
http://localhost:5000/api/books

PUT
http://localhost:5000/api/books/<BOOKID>

DELETE
http://localhost:5000/api/books/<BOOKID>

GET
http://localhost:5000/api/borrow/all
http://localhost:5000/api/borrow/overdue

http://localhost:5000/api/books


You can test the backend using:

Postman – Create requests to test endpoints

curl – Example:

curl http://localhost:5000/books



 Development Tips

Use npm start – auto restart on changes

Check console logs for DB connection confirmation

Keep MongoDB running while testing

Troubleshooting

MongoDB not running
Start MongoDB manually with net start MongoDB or brew services start mongodb-community.

Port already used
Change PORT in .env file.

Validation Errors
Make sure you send all required fields in request body.


