import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const DepartureForm = ({empno}) => {
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [driverName, setDriverName] = useState('');

    useEffect(() => {
      // Fetch the driver's name based on empno
      const fetchDriverName = async () => {
        try {
          const response = await axios.get(`/api1/driverName/${empno}`);
          setDriverName(response.data.driverName);
        } catch (error) {
          console.error('Error fetching driver name:', error);
        }
      };
  
      fetchDriverName();
    }, [empno]);
  

    const handleDeparture = async () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();
  
        setDepartureDate(formattedDate);
        setDepartureTime(formattedTime);
    
        try {
          await axios.post('/api/Departure', {
            driverId:empno,
            departureDate: formattedDate,
            departureTime: formattedTime,
          });
    
          console.log('Departure marked successfully!');
        } catch (error) {
          console.error('Error marking departure:', error);
        }
      };

      return (
        <div>
          <h2>Driver Departure Form</h2>
          <div className="mb-4">
        <h3>Departure</h3>
        <p>Driver ID: {empno}</p>
        <p>Driver Name: {driverName}</p>
        <p>Date: {departureDate}</p>
        <p>Time: {departureTime}</p>
        <button className="btn btn-primary" onClick={handleDeparture}>
          Mark Departure
        </button>
      </div>

      </div>
    );
      }
  export default DepartureForm;
  