import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const DriverDropdown = ({ value, onChange }) => {
  const handleOnChange = (event) => {

    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select className="form-select" value={value} onChange={handleOnChange}>
      <option>Driver</option>
      <option value="AddDriver">Add Driver</option>
      <option value="UpdateDriver">Update Driver</option>
      <option value="SearchDriver">Search Driver</option>
    </select>
  );
};
export default DriverDropdown;