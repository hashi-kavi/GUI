import React from 'react';

const LoginPage = () => (
  <div className="page-container">
    <h1>Login</h1>
    <form>
      <input type="text" placeholder="Username" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
);

export default LoginPage;
