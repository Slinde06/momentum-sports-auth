<h1 align="center"> Momentum Sports Auth App</h1>

<p align="center">
  <b>Full-stack web app with user authentication</b> · Built by <a href="https://github.com/Slinde06">Shaun Linde</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white" />
</p>

---

##  Table of contents

1. [About the project](#about-the-project)
2. [Getting started](#getting-started)
3. [Features](#features)
4. [Development process](#development-process)
5. [Final outcome](#final-outcome)
6. [Conclusion](#conclusion)
7. [License, contact & acknowledgements](#license)

---

## About the project

Momentum Sports is an online sports store front end with a secure account system. Users sign up and log in, passwords are hashed with bcrypt before they are saved in MongoDB, and the server returns a JSON Web Token (JWT) that keeps the user logged in. Protected routes check that token before letting the request through.

I built it to understand how real login systems work from end to end: form validation in React, password hashing, token signing and route protection on the server.

> This is my individual build of the login system. The full group store is here: [momentumsports_dv200](https://github.com/251142-coenraadjlindholm/momentumsports_dv200).

**Built with:** React, React Router, React Bootstrap, Axios · Node.js, Express, MongoDB (Mongoose), bcryptjs, jsonwebtoken

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- A MongoDB database: a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or local MongoDB
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Slinde06/momentum-sports-auth.git
cd momentum-sports-auth
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=any-long-random-string
PORT=5000
```

Start the server:

```bash
npm run dev
```

### 3. Frontend setup (new terminal)

```bash
cd frontend
npm install
npm start
```

The app opens at **http://localhost:3000** and talks to the API at `http://localhost:5000/api/auth`.

---

## Features

-  **Sign up** with name, email and password (min. 6 characters, unique email)
-  **Log in** and receive a JWT
-  **Protected routes** using `verifyToken` middleware
-  **Client-side validation** and clear error messages
-  **Automatic redirect** after login or sign-up
-  Store pages: home, products, cart, checkout, about and support

### Screenshots

**Sign up**

<img width="1913" height="939" alt="Msign" src="https://github.com/user-attachments/assets/a0986a9c-69e5-4568-9206-ccd566ef9902" />

**Log in**

<img width="1917" height="947" alt="MLogin" src="https://github.com/user-attachments/assets/9523e35c-2e38-4fb5-b9a5-f02d2a5437df" />

**Home**

<img width="1917" height="946" alt="MHomee" src="https://github.com/user-attachments/assets/29d0d962-4c2f-40cc-a5d5-bbfdd14f5ef6" />



---

##  Development process

### Architecture

```
React frontend (localhost:3000)
   │  Axios POST /api/auth/register, /api/auth/login
   ▼
Express API (localhost:5000)
   ├── routes/authRoutes.js
   ├── controllers/authcontroller.js   → bcrypt hash / compare, sign JWT
   ├── middleware/verifyToken.js       → checks "Bearer <token>"
   └── models/User.js                  → Mongoose schema
   ▼
MongoDB Atlas (users collection)
```

### Database design (ERD)

| User | Type | Rules |
|---|---|---|
| `_id` | ObjectId | primary key |
| `name` | String | required, trimmed |
| `email` | String | required, unique, lowercase |
| `password` | String | required, min. 6, stored as bcrypt hash |
| `createdAt` / `updatedAt` | Date | added automatically |

### User flow

![User flow](frontend/src/components/Flowchart%20-%20Page%201%20(1).png)

### Key code snippet: hashing the password on sign-up

```js
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'Email already in use' });

const hashed = await bcrypt.hash(password, 12); // 12 salt rounds
await User.create({ name, email, password: hashed });
```

### Key code snippet: protecting a route

```js
const token = req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id);
next();
```

### Challenges

- The navbar broke late in development, so I rolled back to an earlier working version and re-applied my changes step by step.
- Login errors return one generic "Invalid credentials" message so the app does not reveal which emails are registered.


### Testing

- Tested sign-up and login in the browser with valid details, missing fields and an email that was already registered.
- Checked that a wrong password shows an "Invalid credentials" message.

---

##  Final outcome

-  **Demo video (5 to 8 min):** [Watch on Google Drive](https://drive.google.com/drive/folders/1YBBXPXewO2gJDWbghah_cNbtPE76QUUd?usp=sharing)

---

## Conclusion

**Highlights:** a working end-to-end login system with hashed passwords and token-protected routes.

**Challenges and how I solved them:** see [Challenges](#challenges) above.

**Future improvements**

- Store the token in an httpOnly cookie instead of local storage
- Password reset by email
- Connect the cart and checkout to a real products database
- Admin roles for managing products

---

##  Author

**Shaun Linde**
 [251208@virtualwindow.co.za](mailto:251208@virtualwindow.co.za) ·  [GitHub](https://github.com/Slinde06)

