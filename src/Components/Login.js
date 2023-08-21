import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the UserRegisterForm component 
import UserRegisterForm from './UserRegister';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userRole, setUserRole] = useState(null); // State for user role
  const Navigate = useNavigate();

  // State to control the visibility of the "Forgot Password" form
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

// State to control the visibility of the registration form
const [showRegisterForm, setShowRegisterForm] = useState(false);
  
  // Function to toggle the visibility of the "Forgot Password" form
  const toggleForgotPasswordForm = () => {
    setShowForgotPasswordForm(!showForgotPasswordForm);
    setForgotPasswordEmail(''); // Clear the email field
    setForgotPasswordMessage(''); // Clear the message
  };

  // Function to submit the email address for password reset
  const handleForgotPasswordSubmit = async () => {
    try {
      const response = await axios.post('/api/forgotpassword', {
        email: forgotPasswordEmail,
      });
      setForgotPasswordMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle successful registration and redirection
  const handleSuccessfulRegistration = (isSuccessful) => {
    if (isSuccessful) {
      setMessage('User registered successfully! Please login.');
      // Redirect to the login page after successful registration
      Navigate('/'); 
    }
  };

  const handleLogin = async () => {

    // Check if username and password fields are empty
  if (!user_name.trim() || !password.trim()) {
    setMessage('Please enter both username and password.');
    return;
  }
  try {
    const response = await axios.post('http://localhost:3001/api/login', {
      user_name,
      password,
    });
    
    const { message, token, userType } = response.data; // Add userType here

    if (token) {
      setUserRole(userType);
      localStorage.setItem('token', token);

      // Redirect to appropriate homepage based on user role
      if (userType === 'admin') {
        Navigate('/AdminPage');
      } else if (userType === 'driver') {
        Navigate('/DriverPage');
      } else if (userType === 'analyst') {
        Navigate('/AnalystPage');
      }      
    } else {
      setMessage(message); // Display error message
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  const handleCancel = () => {
    setUser_name('');
    setPassword('');
    setMessage('');
  };

  const handleToggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setMessage(''); 
  };

  return (
    <div className="container">
      <h1 className="display-6 centered-heading">Government Analyst Department</h1>
      <div className="mt-4 col-md-4 offset-md-4">
        {/* Display the "Forgot Password" form when showForgotPasswordForm is true */}
        {showForgotPasswordForm ? (
          <React.Fragment>
            <h2 className="mb-3">Forgot Password</h2>
            {/* Forgot Password form */}
            <form>
              <div className="mb-3">
                <label htmlFor="forgotPasswordEmail" className="form-label">
                  Email Address:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleForgotPasswordSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleForgotPasswordForm}
                >
                  Cancel
                </button>
              </div>
            </form>
            {forgotPasswordMessage && (
              <p className="mt-3 text-danger">{forgotPasswordMessage}</p>
            )}
          </React.Fragment>
        ) : (
    // Display the login or registration form
    !showRegisterForm ? (
      <React.Fragment>
           <h2 className="mb-3">Login</h2>
           <form>
             <div className="mb-3">
               <label htmlFor="user_name" className="form-label">
                 Username (Employee Number):
               </label>
               <input
                 type="intiger"
                 className="form-control"
                 id="user_name"  
                 value={user_name}
                 onChange={(e) => setUser_name(e.target.value)}
               />
                 </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                </div>
            </form>
            {message && <p className="mt-3 text-danger">{message}</p>}
            <p className="mt-3">
              Don't have an account?{' '}
              <button className="btn btn-link" onClick={handleToggleRegisterForm}>
                Register
              </button>
              {' | '}
              <button className="btn btn-link" onClick={toggleForgotPasswordForm}>
                Forgot Password?
              </button>
            </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
            <h2 className="mb-3">Register</h2>
            <UserRegisterForm onSuccessRegistration={handleSuccessfulRegistration} />
            <p className="mt-3">
              Already have an account?{' '}
              <button className="btn btn-link" onClick={handleToggleRegisterForm}>
                Login
              </button>
            </p>
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}; 
export default Login;