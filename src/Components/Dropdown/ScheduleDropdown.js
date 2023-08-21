import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ScheduleDropdown = ({ value, onChange }) => {
    const handleOnChange = (event) => {
      const selectedValue = event.target.value;
      onChange(selectedValue);
    };
  
    return (
      <select className="form-select" value={value} onChange={handleOnChange}>
        <option>Schedule</option>
        <option value="addshedule">Add Schedule</option>
        <option value="updateshedule">Update Schedule</option>
        <option value="deleteschedule">Delete Schedule</option>
        <option value="searchschedule">Search Schedule</option>
        <option value="report">Report</option>
      </select>
    );
  };

  export default ScheduleDropdown;