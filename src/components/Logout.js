import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <button className="logout-item" onClick={handleLogout}>
    Logout
  </button>
  );
};

export default Logout;