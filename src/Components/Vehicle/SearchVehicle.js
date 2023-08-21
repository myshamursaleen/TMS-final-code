import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css';

function SearchVehicle() {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api1/vehicleSearchRouter/${searchCriteria}`);
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
  const handleDelete = async (vehicleno) => {
    try {
      // Send a DELETE request to the backend API to delete the vehicle record
      await axios.delete(`http://localhost:3001/api1/vehicleDeleteRouter/${vehicleno}`);
      // Remove the deleted record from the search results
      setSearchResults((prevResults) => prevResults.filter((result) => result.vehicleno !== vehicleno));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h3>Search Vehicle Details</h3>
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
                <th>Vehicle Type</th>
                <th>Vehicle Class</th>
                <th>Fuel Type</th>
                <th>Insurance No.</th>
                <th>Insurance exp Month</th>
                <th>Insurance Company</th>
                <th>Engine No.</th>
                <th>Manufecture Year</th>
                <th>1st registered date</th>
                <th>Tyre size</th>
                <th>Battery size</th>
                <th>Vehicle License No.</th>
                <th>Licence Exp Date</th>
                <th>Other details</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.v_no}>
                  <td>{result.v_no}</td>
                  <td>{result.v_type}</td>
                  <td>{result.v_class}</td>
                  <td>{result.oil_type}</td>
                  <td>{result.Insurance_no}</td>
                  <td>{formatDate(result.Ins_exp_date)}</td>
                  <td>{result.ins_company}</td>
                  <td>{result.engine_no}</td>
                  <td>{result.manufacture_year}</td>
                  <td>{formatDate(result.Fst_reg_date)}</td>
                  <td>{result.tyre_size}</td>
                  <td>{result.battery_size}</td>
                  <td>{result.license_no}</td>
                  <td>{formatDate(result.licence_exp_date)}</td>
                  <td>{result.other_details}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(result.v_no)}>
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

export default SearchVehicle;