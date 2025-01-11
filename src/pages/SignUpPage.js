import React from 'react';
const SignUpPage = () =>(
    <div className="page-container">
        <h1>Sign Up</h1>
        <form>
            <input type="text" placeholder="Username" required/>
            <input type="email" placeholder="Email"  required/>
            <input type="password" placeholder="Password" required/>
            <button type="submit">Sign Up</button>

        </form>
    </div>
);
export default SignUpPage;