# PicTale

PicTale is a full-stack blogging platform where users can share stories with photos. Users can create an account, securely log in, publish blog posts with images, and explore content shared by others.

The project is built with the MERN stack and focuses on clean architecture, secure authentication, and a modern user experience.

## Features

### Authentication

* User registration
* Secure login
* JWT Access Token authentication
* Refresh Token authentication
* HTTP-only cookies
* User logout
* Password hashing with bcrypt

### Blog

* Create blog posts
* Upload images
* Edit posts
* Delete posts
* View all posts
* View individual posts

### User

* User profiles
* Profile pictures
* Personal blog collection

## Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* cookie-parser

## Project Structure

```text
PicTale/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

### Install dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret
```

### Run the Backend

```bash
cd backend
npm run dev
```

### Run the Frontend

```bash
cd frontend
npm run dev
```

## Current Progress

* Authentication system
* JWT Access and Refresh Tokens
* MongoDB integration
* User management

## Planned Features

* Image uploads
* Rich text editor
* Blog categories
* Search functionality
* Like and bookmark posts
* Comments
* User dashboard
* Responsive design

## License

This project is licensed under the MIT License.
