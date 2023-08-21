import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ScheduleDropdown from '../Dropdown/ScheduleDropdown';
import SettingDropdown from '../Dropdown/SettingsDropdown';
import AboutUsDropdown from '../Dropdown/AboutUsDropdown'
import AttendanceDropdown from '../Dropdown/AttendanceDropdown';
import DepartureForm from '../Attendance/Departure';
import AttendanceForm from '../Attendance/Arrival';
import LeaveForm from '../Attendance/Leave';

const DriverPage =  ({ userRole, setUserRole }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  }

  const handleLogout = (e) => {
    e.preventDefault();
     // Clear user role and token
    setUserRole(null);
   localStorage.removeItem('token');
    console.log("Logout button clicked");

    // Wrap the asynchronous code inside an IIFE
  (async () => {
    try {
      // Send a logout request to the server
      await axios.post('http://localhost:3001/api/logout');
      console.log('Logout successful');

      // Clear the token from localStorage:
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirect to the login page after logout
    } catch (error) {
      // Handle logout error
      console.error('Error logging out!', error);
    }
  })();
};

return (
<Container>
      <Row>
        <Col>
          <h2>Welcome!</h2>
        </Col>
      </Row>
 <Container fluid style={{ backgroundColor: 'white', maxWidth: '1200px' }}>
    <Row>
      <Col md={12} className='d-flex justify-content-end mt-3 mb-3'>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </Col>
    </Row>
    <Row>
      {userRole === 'driver' && (
       <>
       <DriverPage />
          <Col md={2}>
            <AttendanceDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
          <Col md={2}>
            <SettingDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
          <Col md={2}>
            <ScheduleDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
          <Col md={2}>
            <AboutUsDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
          </>
      )}
      </Row>

      {/* Conditional rendering of components */}
    {userRole === 'driver' && selectedOption === 'Arrival' && (
      <AttendanceForm />
    )}
    {userRole === 'driver' && selectedOption === 'Departure' && (
      <DepartureForm />
    )}
    {userRole === 'driver' && selectedOption === 'Leave' && (
     <LeaveForm/>
    )}
   {/*{userRole === 'driver' && selectedOption === 'Report' && (
    )}
    {userRole === 'driver' && selectedOption === 'searchschedule' && (
    )}*/}
    </Container>
    </Container>
)
};

export default DriverPage;
