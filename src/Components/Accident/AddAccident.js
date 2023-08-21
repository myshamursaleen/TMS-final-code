import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';



function AddAccidentForm() {
const [vehino, setVehino] = useState('');
const [accdate, setAccdate] = useState('');
const [acctime, setAcctime] = useState('');
const [accspot, setAccspot] = useState('');
const [driname, setDriname] = useState('');
const [insuranceclaim, setInsuranceclaim] = useState('');
const [accdetails, setAccdetails] = useState('');
const [errors, setErrors] = useState({});

const validateForm = (event) => {
    event.preventDefault(); // Prevent form submission if validation fails
    const newErrors = {};
    if (!vehino) newErrors.vehino = 'Please enter the vehicle No';
    if (!accdate) newErrors.accdate = 'Please enter the accident date';
    if (!acctime) newErrors.acctime = 'Please enter accident time';
    if (!accspot) newErrors.accspot = 'Please enter accident spot';
    if (!driname) newErrors.driname = 'Please enter the driver name';
    if (!insuranceclaim) newErrors.insuranceclaim = 'Please enter whether insurance is claimed or not';
    if (!accdetails) newErrors.accdetails = 'Please enter further details';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm(event);

    if (!isValid) {
      return;
    }

    try {
      // Send the form data to the backend
      const response = await axios.post('http://localhost:3001/api/AddAccidentrouter', {
        vehino,
        accdate,
        acctime,
        accspot,
        driname,
        insuranceclaim,
        accdetails,
      });

console.log(response.data);

setVehino('');
setAccdate('');
setAcctime('');
setAccspot('');
setDriname('');
setInsuranceclaim('');
setAccdetails('');
setErrors({});
alert("Accident details submitted successfully!");
}
catch
(error) {
  console.log(error);
  console.log('Vehicle No.:', vehino);
  console.log('Accident date:', accdate);
  console.log("Accident time:", acctime);
  console.log('Accident venue:', accspot);
  console.log('Driver name:', driname);
  console.log('Insurance Claimed:',insuranceclaim);
  console.log("accident details:", accdetails);
}
};

const handleCancel = (event) => {
  event.preventDefault();
  setVehino('');
  setAccdate('');
  setAcctime('');
  setAccspot('');
  setDriname('');
  setInsuranceclaim('');
  setAccdetails('');
  setErrors({});

};

const InsuranceclaimOptions = ["claim", "claimed"]

  return (
    <div className='container'>
  <h2>Accident Details</h2>
  <h3>Add details about an Accident</h3>
  <form onSubmit={handleSubmit}>
     <div className='row mb-3'>
     <div className='col-md-6'>
    <label htmlFor="vehino">Vehicle No:</label>
      <input
      type="Text"
      id="vehino"
      name="vehino"
     value={vehino}
    onChange={(e) => setVehino(e.target.value)}
    required
    className="form-control"
    />
    {errors.vehino && <div className="error">{errors.vehino}</div>}
</div>
</div>
<div className="row mb-3">
  <div className="col-md-6">
    <label htmlFor="accdate">Accident date:</label>
    <input
      type="date"
      id="accdate"
      name="accdate"
      value={accdate}
      onChange={(e) => setAccdate(e.target.value)}
      required
      className="form-control mb-2"
    />
    {errors.accdate && <div className="error">{errors.accdate}</div>}
</div>
</div>
<div className="row mb-3">
<div className="col-md-6">
     <label htmlFor="acctime">Accident time:</label>
      <input
      type="time"
      id="acctime"
      name="acctime"
     value={acctime}
    onChange={(e) => setAcctime(e.target.value)}
    required
    className="form-control mb-2"
    />
    {errors.vehitime && <div className="error">{errors.vehitime}</div>}
</div>
</div>
<div className="row mb-3">
<div className="col-md-6">
     <label htmlFor="accspot">Accident Spot:</label>
      <input
      type="text"
      id="accspot"
      name="accspot"
     value={accspot}
    onChange={(e) => setAccspot(e.target.value)}
    required
    className="form-control mb-2"
    />
    {errors.accspot && <div className="error">{errors.accspot}</div>}
</div>
</div>
<div className="row mb-3">
<div className="col-md-6">
<label htmlFor="driname">Driver name:</label>
      <input
      type="text"
      id="driname"
      name="driname"
     value={driname}
    onChange={(e) => setDriname(e.target.value)}
    required
    className="form-control mb-2"
    />
    {errors.driname && <div className="error">{errors.driname}</div>}
    </div>
</div>
<div className="row mb-3">
<div className="col-md-6">
<label htmlFor="insuranceclaim">Insurance Claim:</label>
         <select
              id="insuranceclaim"
              name="insuranceclaim"
              value={insuranceclaim}
              onChange={(e) => setInsuranceclaim(e.target.value)}
              required
              className="form-control mb-2"
            >
              <option value="">Select 
              s</option>
              {InsuranceclaimOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
      {errors.insuranceclaim && <div className="error">{errors.insuranceclaim}</div>}
 
</div>
</div>
<div className="row mb-3">
<div className="col-md-6">
<label htmlFor="accdetails">Accident Details:</label>
      <input
      type="text"
      id="accdetails"
      name="accdetails"
     value={accdetails}
    onChange={(e) => setAccdetails(e.target.value)}
    required
    className="form-control mb-2"
    />
    {errors.accdetails && <div className="error">{errors.accdetails}</div>}
</div>
</div>
<br/>
<div className="d-flex justify-content-end">
<Button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
  Cancel
</Button>
  <Button type="submit" className="btn btn-primary" onClick={handleSubmit}>
    Submit
  </Button>
</div>
  </form>
</div>
  );
}
export default AddAccidentForm;