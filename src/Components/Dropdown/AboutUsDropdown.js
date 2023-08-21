import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUsDropdown = ({ value, onChange }) => {
    const handleOnChange = (event) => {
      const selectedValue = event.target.value;
      onChange(selectedValue);
    };
  
    return (
      <select className="form-select" value={value} onChange={handleOnChange}>
        <option value="aboutus">About Us</option>
        <option value="contactdetails">Contact Details</option>
        </select>
    );
  };
 
  export default AboutUsDropdown;