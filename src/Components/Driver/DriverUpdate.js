import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the empno from the URL
import axios from 'axios';
 
  

function UpdateDriverPage({}) {
  const { empno } = useParams(); // Get the empno from the URL parameter

  const [driverData, setDriverData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the driver data from the backend API based on the empno
    const fetchDriverData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api1/driverSearchRouter/${empno}`);
        setDriverData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchDriverData();
  }, [empno]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h3>Update Driver Details</h3>
      
    </div>
  );
}

export default UpdateDriverPage;
