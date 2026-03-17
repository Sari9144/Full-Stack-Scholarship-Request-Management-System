# Scholarship Request Management System

A Full-Stack application for managing scholarship requests — students can submit multi-step applications, and an admin can view, approve, or reject them.

---

## Tech Stack

### Client
- **React** + **Vite**
- **Redux Toolkit** — global state management with async thunks
- **React Router** — client-side routing
- **Axios** — HTTP requests
- **SweetAlert2** — user notifications

### Server
- **Node.js** + **Express**
- **MongoDB** + **Mongoose** — database and ODM
- **JWT** — user authentication
- **bcrypt** — password hashing

---

## Features

- **Register & Login** with JWT authentication and full validation (including Israeli ID checksum)
- **Multi-step application form** — personal details, family, course and bank — with automatic draft saving
- **Final submission** with status tracking
- **Admin dashboard** — view pending/rejected requests, approve or reject with real-time list updates
- **Validation** on both client and server — matching rules on both sides
- **Protected routes** — auth middleware on every secured endpoint

---

## Project Structure

```
client/
├── comps/          # Components (Login, Register, MultiForm, ViewRequests...)
├── redux/          # userSlice, requestSlice
├── services/       # api.js, UserService.js, requestService.js
├── css/            # Styles
└── Routing/        # Nav, Routing

server/
├── api/
│   ├── controler/  # User.js, Request.js
│   ├── models/     # User, Request, PersonalFrom, FamilyFrom, CourseFrom, BankFrom
│   └── routers/    # User.js, Request.js
├── middlewares.js  # auth + validations
└── app.js
```

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB (Atlas or local)

### Server
```bash
cd server
npm install
```
Create a `.env` file:
```
URI=<MongoDB connection string>
SECRET=<JWT secret>
```
```bash
npm start
```

### Client
```bash
cd client
npm install
npm run dev
```

Server runs on port **3001**, client on port **3000** (or **5173** with Vite).

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/user/register` | Register a new user |
| POST | `/user/login` | Login |
| POST | `/user/logout` | Logout |
| GET | `/user/me` | Get current user |
| GET | `/request/` | Get all pending/rejected requests (admin) |
| GET | `/request/my-status` | Get current user's latest request status |
| GET | `/request/draft` | Load saved draft |
| POST | `/request/draft` | Save draft |
| POST | `/request/submit` | Submit final request |
| PATCH | `/request/allow/:id` | Approve request |
| PATCH | `/request/reject/:id` | Reject request |
