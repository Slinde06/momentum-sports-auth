# Demo Video Link

link:https://drive.google.com/drive/folders/1YBBXPXewO2gJDWbghah_cNbtPE76QUUd?usp=sharing
---


# Auth App

A full-stack authentication system built with React on the frontend and Node.js/Express on the backend, using MongoDB for data storage and JWT for session management.

---

## Features

- User registration with hashed passwords
- User login with JWT token authentication
- Protected route middleware
- Client-side form validation
- Automatic redirect after login/registration

---

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- Mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- dotenv
- cors

---

## Project Structure

```
├── backend/
│   ├── controllers/
│   │   └── authController.js   # Register and login logic
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification middleware
│   ├── models/
│   │   └── User.js             # Mongoose User schema
│   ├── routes/
│   │   └── authRoutes.js       # Auth route definitions
│   ├── .env                    # Environment variables (never commit this)
│   └── server.js               # Express app entry point
│
└── frontend/
    └── src/
        └── pages/
            ├── LoginPage.jsx   # Login form and logic
            └── Signup.jsx      # Registration form and logic
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- A MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Start the server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA).

---

## API Endpoints

| Method | Endpoint             | Description              | Auth Required |
|--------|----------------------|--------------------------|---------------|
| POST   | /api/auth/register   | Register a new user      | No            |
| POST   | /api/auth/login      | Log in an existing user  | No            |

### POST /api/auth/register

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success response (201):**
```json
{
  "message": "Account created successfully!"
}
```

---

### POST /api/auth/login

**Request body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success response (200):**
```json
{
  "token": "<jwt_token>",
  "name": "John Doe"
}
```

---

## Security Notes

- Passwords are hashed using **bcryptjs** with a salt round of 12 before being stored.
- JWTs expire after **1 day** and must be included in the `Authorization: Bearer <token>` header for protected routes.
- The `.env` file must **never** be committed to version control. Add it to your `.gitignore`:
  ```
  .env
  ```
- Use a strong, random string for `JWT_SECRET` in production.

---

## Known Issues / Notes

- The login page collects a `username` field but only sends `email` and `password` to the API. The username field on the login form can be removed or wired up as needed.
- `localStorage` is used to store the JWT token on the client. For higher security in production, consider using `httpOnly` cookies instead.