import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import DriverDropdown from './Dropdown/DriverDropdown';
import VehicleDropdown from './Dropdown/VehicleDropdown';
import ScheduleDropdown from './Dropdown/ScheduleDropdown';
import SettingDropdown from './Dropdown/SettingsDropdown';
import AboutUsDropdown from "./Dropdown/AboutUsDropdown";
import AccidentDropdown from './Dropdown/AccidentDropdown';
import RegisterForm from './Driver/DriverAdd';
import DriverSearchForm from "./Driver/DriverSearch";
import VehicleRegisterForm from './Vehicle/VehicleAdd';
import SearchVehicle from './Vehicle/SearchVehicle';
import AddAccidentForm from './Accident/AddAccident';
import AttendanceDropdown from './Dropdown/AttendanceDropdown';
import DepartureForm from './Attendance/Departure';
import AttendanceForm from './Attendance/Arrival';
import LeaveForm from './Attendance/Leave';
import AccidentSearch from './Accident/SearchAccident';
import DriverPage from './Home/DriverPage';
import AdminPage from "./Home/AdminPage";
import AnalystPage from './Home/AnalystPage';


const Dashboard = ({ userRole, setUserRole }) => {
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
        
      {userRole === 'admin' && (
       <>
       <AdminPage />
          <Col md={2}>
            <DriverDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
          <Col md={2}>
            <VehicleDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
          <Col md={2}>
            <AccidentDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
         <Col md={2}>
            <ScheduleDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
          <Col md={2}>
            <AttendanceDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
          <Col md={2}>
            <SettingDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
          <Col md={2}>
            <AboutUsDropdown value={selectedOption} onChange={handleOptionChange} />
          </Col>
        </>
      )}
      {userRole === 'analyst' && (
        <>
        <AnalystPage/>
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

    {userRole === 'admin' && selectedOption === 'AddDriver' && (
   <RegisterForm/>

    )}
    {userRole === 'admin' && selectedOption === 'SearchDriver' && (
   <DriverSearchForm/>
    )}
    {/*{userRole === 'admin' && selectedOption === 'UpdateDriver' && (
      
    )}*/}
    {userRole === 'admin' && selectedOption === 'addvehiclce' && (
   <VehicleRegisterForm/>
    )}
   {userRole === 'admin' && selectedOption === 'searchvehicle' && (
    <SearchVehicle/>
   )}
   {/*{userRole === 'admin' && selectedOption === 'updatevehicle' && (
    
   )}*/}
    {/*{userRole === 'admin' && selectedOption === 'addschedule' && (
      
    )}
    {userRole === 'admin' && selectedOption === 'searchschedule' && (
    
   )}
   {userRole === 'admin' && selectedOption === 'updateschedule' && (
    
   )}
   */}
   {userRole === 'admin' && selectedOption === 'addaccident' && (
      <AddAccidentForm/>
    )}
    {userRole === 'admin' && selectedOption === 'searchaccident' && (
    <AccidentSearch/>
   )}
   {/*{userRole === 'admin' && selectedOption === 'updateaccident' && (
    
   )}
    {userRole === 'admin' && selectedOption === 'viewattendance' && (
  
    )}
    {userRole === 'admin' && selectedOption === 'Report' && (
      
    )}
    */}
    {/*{userRole === 'admin' && selectedOption === 'aboutus' && (
      
      )}
      {userRole === 'admin' && selectedOption === 'contactdetails' && (
      
      )}
    {userRole === 'admin' && selectedOption === 'changepw' && (
      
      )}
    */}

  
  { /* {userRole === 'analyst' && selectedOption === 'addschedule' && (
      
    )}
{userRole === 'analyst' && selectedOption === 'viewschedule' && (
      
)}*/}
  </Container>
);
};

export default Dashboard;