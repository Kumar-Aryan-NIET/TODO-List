import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientPanel from './pages/ClientPanel';
import AdminPanel from './pages/AdminPanel';
import { getToken, getUserRole } from './utils/auth';

const PrivateRoute = ({ children, role }) => {
  const token = getToken();
  const userRole = getUserRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== undefined && userRole !== role) {
    // Redirect to appropriate panel if role mismatch
    if (userRole === 0) return <Navigate to="/admin" replace />;
    if (userRole === 1) return <Navigate to="/client" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/client/*"
          element={
            <PrivateRoute role={1}>
              <ClientPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute role={0}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
