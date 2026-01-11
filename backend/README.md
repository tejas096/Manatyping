# ManaTyping Backend

ManaTyping is a privacy-focused student typing analysis platform. It helps students develop genuine typing habits while allowing teachers to monitor effort, speed, consistency, and suspicious activity — **without storing actual typed content**.

This backend provides secure APIs for student and teacher management, session tracking, and analytics.

---

## Features

### Student

- Signup & login (Email & Google OAuth)
- View profile
- Start, pause, and end typing sessions
- View past sessions and analytics

### Teacher

- Signup & login (Email & Google OAuth)
- View all students and their session summaries
- Monitor student session analytics (typing speed, consistency, integrity status)
- Identify suspicious sessions

### Session Tracking

- Track typing analytics:
  - Typing speed
  - Typing consistency
  - Thinking mode duration
  - Number of pauses
  - Bursts of typing activity
- Session CRUD (Create, Read, Delete)
- Automatic updates in student session records

### Security & Authentication

- JWT-based authentication
- Role-based access control (`student` vs `teacher`)
- Google OAuth integration
- Secure cookie handling

---

## Tech Stack

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Zod validation
- Passport.js (Google OAuth)
- JWT authentication
- Middleware: Helmet, CORS, compression, cookie-parser

---

## Folder Structure

/src

- /config # Database & Passport config
- /middlewares # Auth, error handling, validation
- /modules
- - /student # Routes, controllers, models, validation
- - /teacher # Routes, controllers, models, validation
- - /session # Routes, controllers, models, validation
- /utils # Utility functions
- app.ts # Express app setup
- index.ts # Root file

---

## Installation & Setup

1. Clone the repository:

- git clone <repo-url>
- cd mana-typing-backend

2. Install dependencies:

- npm install

3. Create .env file in the root:

- PORT=5000
- CONNECTURL=<your-mongo-uri>
- SECRET=<jwt-secret>
- GOOGLE_CLIENT_ID=<google-client-id>
- GOOGLE_CLIENT_SECRET=<google-client-secret>
- CLIENT_URL=http://localhost:3000

4. Run the server:

- npm run dev # Server will run on http://localhost:5000.

---

## API ENDPOINTS

- Student

| Method | Route                        | Description                        |
| ------ | ---------------------------- | ---------------------------------- |
| POST   | /api/student/signup          | Register a new student             |
| POST   | /api/student/login           | Login student                      |
| GET    | /api/student/                | Get student profile (JWT required) |
| GET    | /api/student/studentDetails  | Get all students (Teacher only)    |
| GET    | /api/student/google          | Google OAuth login                 |
| GET    | /api/student/google/callback | Google OAuth callback              |
| DELETE | /api/student/logout          | Logout student                     |

- Teacher

| Method | Route                        | Description                        |
| ------ | ---------------------------- | ---------------------------------- |
| POST   | /api/teacher/signup          | Register a new teacher             |
| POST   | /api/teacher/login           | Login teacher                      |
| GET    | /api/teacher/                | Get teacher profile (JWT required) |
| GET    | /api/teacher/google          | Google OAuth login                 |
| GET    | /api/teacher/google/callback | Google OAuth callback              |
| DELETE | /api/teacher/logout          | Logout teacher                     |

- Session

| Method | Route                                        | Description                            |
| ------ | -------------------------------------------- | -------------------------------------- |
| POST   | /api/session/                                | Create a new session (JWT required)    |
| GET    | /api/session/                                | Get all sessions of logged-in student  |
| GET    | /api/session/api/sessions/student/:studentId | Teacher: Get all sessions of a student |
| GET    | /api/session/api/sessions/:id                | Get single session details             |
| DELETE | /api/session/api/sessions/:id                | Delete a session                       |

---

## Notes

- Privacy-first: No typed content is stored unless explicitly opted-in
- Secure authentication: Tokens are validated on every request
- Scalable: Supports multiple sessions per student and multiple teachers

```

```
