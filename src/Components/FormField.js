// FormField.jsx
import React from 'react';

const FormField = ({ label, id, name, type, value, onChange, required, error }) => {
  return (
    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor={id} className="form-label">
          {label}:
        </label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="form-control"
        />
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default FormField;
