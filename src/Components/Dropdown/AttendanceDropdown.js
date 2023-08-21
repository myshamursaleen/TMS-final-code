import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const AttendanceDropdown = ({ value, onChange }) => {
    const handleOnChange = (event) => {
      const selectedValue = event.target.value;
      onChange(selectedValue);
    };
  
    return (
      <select className="form-select" value={value} onChange={handleOnChange}>
        <option value="">Attendance</option>
        <option value="Arrival">Arrival</option>
        <option value="Departure">Departure</option>
        <option value="Leave">Leave</option>
        <option value="Report"> Report </option>
        </select>
    );
  };
 
  export default AttendanceDropdown;