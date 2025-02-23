import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('userId'); // Check if the user is authenticated
  if (!userId) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;