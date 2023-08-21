import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SettingDropdown = ({ value, onChange, logout }) => {
  const handleOnChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  }
  return (
    <select className="form-select" value={value} onChange={handleOnChange}>
      <option value="">Settings </option>
      <option value="changepw">Change Password</option>
    </select>
  );
};

export default SettingDropdown;
