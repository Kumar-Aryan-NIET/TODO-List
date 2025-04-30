# TODO App - Code Execution Flow and Architecture

## Overview

This document explains the architecture and code execution flow of the TODO app built with ReactJS, ExpressJS, MongoDB, and Tailwind CSS. It includes key code snippets and diagrams illustrating the flow.

---

## Backend Architecture

### 1. Server Setup (`backend/index.js`)

- Express server initialized.
- MongoDB connection established.
- Routes registered:
  - `/api/auth` - Authentication routes (register, login).
  - `/api/todos` - TODO CRUD routes.
  - `/api/user` - User profile and password management routes.

### 2. Models

- **User Model (`backend/models/User.js`)**

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  phone: String,
  role: { type: Number, enum: [0, 1] } // 0: admin, 1: client
});
```

- **Todo Model (`backend/models/Todo.js`)**

```js
const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
```

### 3. Authentication and Authorization

- JWT tokens used for authentication.
- Middleware verifies token and user role.
- Role-based access control implemented in routes.

### 4. Routes

- **Auth Routes (`backend/routes/auth.js`)**

  - `POST /register` - Register new user with hashed password.
  - `POST /login` - Login and receive JWT token.

- **TODO Routes (`backend/routes/todo.js`)**

  - Client routes to create, read, update, delete own TODOs.
  - Admin route to view all client TODOs with pagination.

- **User Routes (`backend/routes/user.js`)**

  - Get and update profile.
  - Admin change password.

---

## Frontend Architecture

### 1. Project Setup

- React app created with Vite.
- Tailwind CSS for styling.
- React Router for navigation.

### 2. Authentication Utilities (`frontend/src/utils/auth.js`)

- Functions to get/set/remove JWT token, user role, and name in localStorage.

### 3. Routing and Role Protection (`frontend/src/App.jsx`)

- Routes for login, register, client panel, admin panel.
- `PrivateRoute` component protects routes based on authentication and role.
- Redirects users to appropriate panels.

### 4. Pages and Components

- **Login and Register Pages**

  - Forms to authenticate and register users.
  - On login, store token and role, redirect accordingly.

- **Client Panel (`frontend/src/pages/ClientPanel.jsx`)**

  - Tabs: Create TODO, View TODO List, Update Profile.
  - Components:
    - `CreateTodo` - Form to create TODO.
    - `ViewTodos` - List client TODOs.
    - `UpdateProfile` - Update user info and password.

- **Admin Panel (`frontend/src/pages/AdminPanel.jsx`)**

  - Tabs: Client TODOs, Change Password.
  - Components:
    - `ClientTodosList` - Paginated table of all client TODOs.
    - `ChangePassword` - Form to change admin password.
