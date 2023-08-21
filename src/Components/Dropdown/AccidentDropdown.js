import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccidentDropdown = ({ value, onChange }) => {
  const handleOnChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select className="form-select" value={value} onChange={handleOnChange}>
        <option>Accident</option>
        <option value="addaccident">Add Accident</option>
        <option value="updateaccident">Update Accident</option>
        <option value="searchaccident">Search Accident</option>
      </select>
    );
  };

  export default AccidentDropdown;