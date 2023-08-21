import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css';

function DriverSearchPage() {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api1/driverSearchRouter/${searchCriteria}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setSearchCriteria('');
    setSearchResults([]);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };
  const handleDelete = async (empno) => {
    try {
      // Send a DELETE request to the backend API to delete the driver record
      await axios.delete(`http://localhost:3001/api1/driverDeleteRouter/${empno}`);
      // Remove the deleted record from the search results
      setSearchResults((prevResults) => prevResults.filter((result) => result.empno !== empno));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h3>Search Driver Details</h3>
      <div className="mb-4">
        <label htmlFor="searchCriteria" className="form-label">Search by Employee No:</label>
        <div className="input-group">
          <input
            type="text"
            id="searchCriteria"
            name="searchCriteria"
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
            className="form-control"
          />
          <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
        {searchResults.length > 0 && (
          <Button className="btn btn-secondary mt-2" onClick={handleClearSearch}>Clear Search</Button>
        )}
      </div>

      {searchResults.length > 0 && (
        <div>
          <h4>Search Results</h4>
          <table className="table table-bordered table-striped">
          
            <thead>
              <tr>
                <th>Employee No.</th>
                <th>Name</th>
                <th>Full Name</th>
                <th>NIC</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Mobile No.</th>
                <th>Address</th>
                <th>License No</th>
                <th>Marital Status</th>
                <th>Email</th>
                <th>First appointment date</th>
                <th>Appointment date to the current department</th>
                <th>Higher Education qualification</th>
                <th>Other details</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.empno}>
                  <td>{result.empno}</td>
                  <td>{result.d_name}</td>
                  <td>{result.d_fullname}</td>
                  <td>{result.NIC}</td>
                  <td>{formatDate(result.DOB)}</td>
                  <td>{result.Age}</td>
                  <td>{result.phone}</td>
                  <td>{result.Address}</td>
                  <td>{result.License_no}</td>
                  <td>{result.marrital_state}</td>
                  <td>{result.email}</td>
                  <td>{formatDate(result.FApp_date)}</td>
                  <td>{formatDate(result.AppDate_dep)}</td>
                  <td>{result.Ed_Qualification}</td>
                  <td>{result.Other_details}</td>
                  <td>
                  <Button variant="danger" onClick={() => handleDelete(result.empno)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DriverSearchPage;