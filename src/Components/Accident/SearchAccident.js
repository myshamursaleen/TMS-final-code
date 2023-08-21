import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css';

function AccidentSearch() {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api1/accidentSearchRouter/${searchCriteria}`);
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
  const handleDelete = async (vehino) => {
    try {
      // Send a DELETE request to the backend API to delete the driver record
      await axios.delete(`http://localhost:3001/api1/AccidentDeleteRouter/${vehino}`);
      // Remove the deleted record from the search results
      setSearchResults((prevResults) => prevResults.filter((result) => result.vehino !== vehino));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h3>Search Accident Details</h3>
      <div className="mb-4">
        <label htmlFor="searchCriteria" className="form-label">Search by Vehicle No:</label>
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
                <th>Vehicle No.</th>
                <th>Accident Date</th>
                <th>Accident Time</th>
                <th>Accident Spot</th>
                <th>Driver Name</th>
                <th>Insurance Claim</th>
                <th>Other Details</th>
                </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.vehino}>
                  <td>{formatDate(result.acc_date)}</td>
                  <td>{result.acc_time}</td>
                  <td>{result.venue}</td>
                  <td>{result.driver_name}</td>
                  <td>{result.insurance_claim}</td>
                  <td>{result.other_details}</td>
                  <td>
                  <Button variant="danger" onClick={() => handleDelete(result.vehino)}>
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

export default AccidentSearch;