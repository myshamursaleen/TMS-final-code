import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VehicleDropdown = ({ value, onChange }) => {
  const handleOnChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select className="form-select" value={value} onChange={handleOnChange}>
        <option>Vehicle</option>
        <option value="addvehicle">Add Vehicle</option>
        <option value="updatevehicle">Update Vehicle</option>
        <option value="searchvehicle">Search Vehicle</option>
      </select>
    );
  };

  export default VehicleDropdown;