import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Profile from './profile';
import '../style/login.css';

function Login() {
  const { login, setEmail, setPassword, email, password, isAuthenticated, responseStatus} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      {isAuthenticated ? (
        <Profile />
      ) : (
        <div className="mainContainer">
          <h2>Login</h2>
          {responseStatus === 401 ? <h5 style={{color: 'red'}}>Incorrect email or password.</h5> : ''}
          <form className="login" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">Login</button>
          </form>
          <p>Don’t have an account?</p>
          <Link to="/register" className="register-link">Create an Account</Link>
        </div>
      )}
    </>
  );
}

export default Login;
