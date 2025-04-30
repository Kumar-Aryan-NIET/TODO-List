# TODO App

This is a full-stack TODO application built with ReactJS, ExpressJS, MongoDB, and Tailwind CSS. It supports user authentication with roles (admin and client) and role-based access control.

## Features

- User registration and login with JWT authentication.
- Two user roles: Admin and Client.
- Client panel with tabs to create TODOs, view TODO list, and update profile.
- Admin panel to view client TODO lists with pagination and change own password.
- Protected routes based on user roles.
- Backend API built with ExpressJS and MongoDB.
- Frontend built with ReactJS (Vite) and styled with Tailwind CSS.
- Code formatting and linting with Prettier, ESLint, and Husky.

## Stack

- ReactJS (Vite)
- ExpressJS
- MongoDB
- Tailwind CSS
- JWT Authentication

## Setup Instructions

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:3000`

## Assumptions

- Role `0` is Admin, role `1` is Client.
- Passwords are hashed using bcrypt.
- JWT tokens are stored in localStorage on the client.
- Admin users can view all client TODOs with pagination.
- Client users can only access their own TODOs and profile.
- The app uses Tailwind CSS version 4.1 as requested.
- The video submission will be made on the build version of the frontend.

## Scripts

- Backend:
  - `npm run dev` - start backend with nodemon
  - `npm start` - start backend normally
- Frontend:
  - `npm run dev` - start frontend dev server
  - `npm run build` - build frontend for production
  - `npm run preview` - preview production build

## Folder Structure

- `backend/` - Express backend
- `frontend/` - React frontend

## Contact

For any questions or issues, please contact the developer.
