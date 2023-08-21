import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AttendanceForm = ({ empno }) => {
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [driverName, setDriverName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDriverName = async () => {
      try {
        const response = await axios.get(`/api1/driverName/${empno}`);
        setDriverName(response.data.driverName);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching driver name:', error);
        setError('Error fetching driver name');
        setLoading(false);
      }
    };

    fetchDriverName();
  }, [empno]);

  const handleArrival = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    setArrivalDate(formattedDate);
    setArrivalTime(formattedTime);

    try {
      await axios.post('/api/Arrival', {
        driverId: empno,
        arrivalDate: formattedDate,
        arrivalTime: formattedTime,
      });

      console.log('Arrival marked successfully!');
    } catch (error) {
      console.error('Error marking arrival:', error);
    }
  };
  return (
   <div className="container mt-5">
      <h2>Driver Attendance Form</h2>
      <div className="mb-4">
        {/* Display loading state */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3>Arrival</h3>
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <p>Driver ID: {empno}</p>
                <p>Driver Name: {driverName}</p>
                <p>Date: {arrivalDate}</p>
                <p>Time: {arrivalTime}</p>
          <button className="btn btn-primary" onClick={handleArrival}>
          Mark Arrival
          </button>
        </>
            )}
          </>
        )}
      </div>
    </div>
  );
};


export default AttendanceForm;
