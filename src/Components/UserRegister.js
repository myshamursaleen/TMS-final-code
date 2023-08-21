import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegisterForm = ({ onSuccessRegistration }) => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    userType: '', 
  });

  const [errors, setErrors] = useState({
    user_name: '',
    email: '',
    password: '',
    userType: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear any previous error when the user types
    });
  };

  const resetForm = () => {
    setFormData({
      user_name: '',
      email: '',
      password: '',
      userType: '',
    });
  
    setErrors({
      user_name: '',
      email: '',
      password: '',
      userType: '',
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    let formIsValid = true;
    const newErrors = {
      user_name: '',
      email: '',
      password: '',
      userType: '',
    };

    // Basic form validation
    if (!formData.user_name.trim()) {
      formIsValid = false;
      newErrors.user_name = 'Employee No. is required';
    }

    if (!formData.email.trim()) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    }
    if (!formData.userType.trim()) {
      formIsValid = false;
      newErrors.userType = 'User Type is required';
    } else if (formData.userType === 'driver') {
      // If the user type is "driver," check the driver details
      try {
        // Send the form data to the backend for verification
        const response = await axios.post('http://localhost:3001/api/verifyDriverDetails', {
          empno: formData.user_name,
          email: formData.email,
        });
  
        // Check if the response indicates a match in driver details
       if (!response.data.isMatch) {
    // If details don't match, show an error message to the user
    newErrors.user_name = 'Employee No. do not match with driver details';
    newErrors.email = 'Email do not match with driver details';
    setErrors(newErrors);
    return;
  } else {
    // If details match, clear the error message
    newErrors.user_name = '';
    newErrors.email = '';
    newErrors.password = '';
    newErrors.userType = '';
    setErrors(newErrors);
  }
      } catch (error) {
        console.error('Error verifying driver details:', error);
        return;
      }
    }
  
    if (formIsValid) {
        axios
          .post('http://localhost:3001/api/register', formData)
          .then(() => {
            // Handle successful registration
            console.log('User registration successful!');
            setShowSuccess(true); // Show the success pop-up
  
 // Reset the form fields and errors
 resetForm();

            // Redirect to login form after registration success
            setTimeout(() => {
              setShowSuccess(false);
              Navigate('/'); 
               }, 2000); // Redirect after 2 seconds
          })
          .catch((error) => {
            newErrors.user_name = "existing username or incorrect username";
            newErrors.email = "existing email or incorrect email";
            setErrors(newErrors);
            // Handle registration error
            console.error('Error registering user:', error);
         });
      } else {

        setErrors(newErrors);
  }
};

  
  const handleCancel = () => {
    setFormData({
      user_name: '',
      email: '',
      password: '',
      userType: '',
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="username">
  <Form.Label>User Name (Your Employee Number)</Form.Label>
  <Form.Control
    type="int"
    name="user_name"
    value={formData.user_name}
    onChange={handleChange}
    required
  />
  {/* Render the error message for user_name */}
  {errors.user_name && !errors.email && (
    <p className="text-danger">{errors.user_name}</p>
  )}
</Form.Group>
<Form.Group controlId="email">
  <Form.Label>Email</Form.Label>
  <Form.Control
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  {/* Render the error message for email */}
  {errors.email && !errors.user_name && (
    <p className="text-danger">{errors.email}</p>
  )}
</Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="text-danger">{errors.password}</p>}
      </Form.Group>
      <Form.Group controlId="userType">
        <Form.Label>User Type</Form.Label>
        <Form.Control
          as="select"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
        >
          <option value="analyst">Analyst</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </Form.Control>
      </Form.Group>
      {showSuccess && (
        <div className="success-popup">
          <p>User registration successful! Redirecting to login page...</p>
        </div>
      )}
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" className="me-2" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Form> 
  );
};

export default UserRegisterForm;