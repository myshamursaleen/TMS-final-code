import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RegisterForm() {
  const [empno, setEmpNo] = useState('');
  const [name, setName] = useState('');
  const [fullname, setFullName] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [licenseno, setLicenseno] = useState('');
  const [marritalstate, setMarritalstate] = useState('');
  const [email, setEmail] = useState('');
  const [fappoinmentd, setFappoinmentd] = useState(null);
  const [currentappdate, setCurrentappdate] = useState(null);
  const [highereduq, setHighereduq] = useState('');
  const [otherdetails, setOtherdetails] = useState('');
  const [errors, setErrors] = useState({});

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const empnoPattern = /^\d{4}$/;
  const phonePattern = /^\d{10}$/;

  const validateForm = (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validate (non-empty) name, fullname, address, nic, and age, etc.
    if (!name) newErrors.name = 'Please enter your name';
    if (!fullname) newErrors.fullname = 'Please enter your Fullname';
    if (!nic) newErrors.nic = 'Please enter your NIC';
    if (!dob) newErrors.dob = 'Please enter your Date of Birth';
    if (!phone) newErrors.phone = 'Please enter your mobile number';
    if (!address) newErrors.address = 'Please enter your permanent address';
    if (!licenseno) newErrors.licenseno = 'Please enter your License No.';
    if (!marritalstate) newErrors.marritalstate = 'Select the marital status';
    if (!fappoinmentd) newErrors.fappoinmentd = 'Please enter your 1st appointment date';
    if (!emailPattern.test(email)) newErrors.email = 'Please enter a valid email address';
    if (!empnoPattern.test(empno)) newErrors.empno = 'Please enter the Employee No. Eg: "0001"';
    if (!phonePattern.test(phone)) newErrors.phone = 'Please enter a 10-digit phone number';
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
      const response = await axios.post('http://localhost:3001/api1/driverAddrouter', {
        empno,
        name,
        fullname,
        nic,
        dob: dob.toISOString().split('T')[0], // Format to 'YYYY-MM-DD' for backend
        phone,
        address,
        licenseno,
        marritalstate,
        email,
        fappoinmentd: fappoinmentd.toISOString().split('T')[0], // Format to 'YYYY-MM-DD' for backend
        currentappdate: currentappdate.toISOString().split('T')[0], // Format to 'YYYY-MM-DD' for backend
        highereduq,
        otherdetails,
      });

      console.log(response.data);

      // Reset form and display success message
      setEmpNo('');
      setName('');
      setFullName('');
      setNic('');
      setDob(null);
      setPhone('');
      setAddress('');
      setLicenseno('');
      setMarritalstate('');
      setEmail('');
      setFappoinmentd(null);
      setCurrentappdate(null);
      setHighereduq('');
      setOtherdetails('');
      setErrors({});
      alert('Driver details submitted successfully!');
    } 
    catch 
    (error) {
      console.log(error);
      console.log('Employee No:', empno);
      console.log('Name:', name);
      console.log('Full Name:', fullname);
      console.log('NIC:', nic);
      console.log('DOB:', dob);
      console.log('Mobile No:', phone);
      console.log('Address:', address);
      console.log('License No.:', licenseno);
      console.log('Marital Status:', marritalstate);
      console.log('Email:', email);
      console.log('First appointment date:', fappoinmentd);
      console.log('Appointment date to the current department:', currentappdate);
      console.log('Higher Education qualification:', highereduq);
      console.log('Other details:', otherdetails);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // Reset the form fields and errors when "Cancel" is clicked
    setEmpNo('');
    setName('');
    setFullName('');
    setNic('');
    setDob(null);
    setPhone('');
    setAddress('');
    setLicenseno('');
    setMarritalstate('');
    setEmail('');
    setFappoinmentd(null);
    setCurrentappdate(null);
    setHighereduq('');
    setOtherdetails('');
    setErrors({});
  };

  const maritalStatusOptions = ["Single", "Married", "Widow", "Divorced"]

  return (
    <div className='container'>
      <h3>Add Driver Details</h3>
      <form onSubmit={handleSubmit}>

      <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor="empno" className="form-label">Employee No:</label>
      <input
        type="Integer"
        id="empno"
        name="empno"
        value={empno}
        onChange={(e) => setEmpNo(e.target.value)}
        required
        className="form-control"
      />
      {errors.empno && <div className="error">{errors.empno}</div>}
    </div>
    </div>
    <div className="row mb-3">
  <div className="col-md-6">
    <label htmlFor="name" className="form-label">Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      className="form-control mb-2" // Add mb-2 class for bottom margin
    />
    {errors.name && <div className="error">{errors.name}</div>}
</div>
</div>
<div className="row mb-3">
  <div className="col-md-6">
         <label htmlFor="fullname" className="form-label">Full Name:</label>
          <input
          type="text"
          id="fname"
          name="fullname"
         value={fullname}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="form-control mb-2"
        />
        {errors.fullname && <div className="error">{errors.fullname}</div>}
</div>
</div>
<div className="row mb-3">
  <div className="col-md-6">
         <label htmlFor="nic" className="form-label">NIC:</label>
          <input
          type="text"
          id="nic"
          name="nic"
         value={nic}
        onChange={(e) => setNic(e.target.value)}
         required
            className="form-control mb-2"
        />
        {errors.nic && <div className="error">{errors.nic}</div>}
</div>
</div>
<div className="row mb-3">
<div className="col-md-6">
    <label htmlFor="dob" className="form-label">Date of Birth:</label>
    <DatePicker
      id="dob"
      name="dob"
      selected={dob}
      onChange={(date) => setDob(date)}
      dateFormat="dd/MM/yyyy" 
      required
      className="form-control mb-2"
    />    
        {errors.dob && <div className="error">{errors.dob}</div>}
</div>
</div>
<div className="row mb-3">
<div className="col-md-6">
      <label htmlFor="address" className="form-label">Address:</label>
        <textarea
          id="address"
          name="address"
          rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
           required
              className="form-control mb-2"
          >
        </textarea>
        {errors.address && <div className="error">{errors.address}</div>}
</div>
</div>
<div className="row mb-3">
  <div className="col-md-6">
      <label htmlFor="phone" className="form-label">Mobile No:</label>
       <input
         type="tel"
         id="phone"
         name="phone"
         pattern="[0-9]{10}"
         value={phone}
         onChange={(e) => setPhone(e.target.value)}
          required
             className="form-control mb=2"
       />
       <small>(10 digits only)</small>
       {errors.phone && <div className="error">{errors.phone}</div>}
</div>
</div>
<div className="row mb-3">
  <div className="col-md-6">
        <label htmlFor="licenseno" className="form-label">License No:</label>
         <input
         type="text"
         id="licenseno"
         name="licenseno"
        value={licenseno}
        onChange={(e) => setLicenseno(e.target.value)}
         required
            className="form-control mb-2"
        />
        {errors.licenseno && <div className="error">{errors.licenseno}</div>}
</div>
</div>
<div className="row mb-3">
  <div className="col-md-6">
        <label htmlFor="marritalstatus" className="form-label">Marrital Status:</label>
        <select
              id="marritalstatus"
              name="marritalstatus"
              value={marritalstate}
              onChange={(e) => setMarritalstate(e.target.value)}
              required
              className="form-control mb-2"
            >
              <option value="">Select Marital Status</option>
              {maritalStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
      {errors.marritalstate && <div className="error">{errors.marritalstate}</div>}
</div>  
</div> 
<br/>
<div className="row mb-3">
  <div className="col-md-6">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
           required
              className="form-control mb-2"
        />
        {errors.email && <div className="error">{errors.email}</div>}
</div>
</div>
<br/>
<div className="row mb-3">
  <div className="col-md-6">
        <label htmlFor="fappoind" className="form-label">1st appoinment date:</label>
        <DatePicker
  id="fappind"
  name="fappind"
  selected={fappoinmentd}
  onChange={(date) => setFappoinmentd(date)}
  dateFormat="dd/MM/yyyy" 
  required
  className="form-control mb-2"
/>    
        {errors.fappoinmentd && <div className="error">{errors.fappoinmentd}</div>}      
</div>
</div>
<br/>
<div className="row mb-3">
  <div className="col-md-6">
        <label htmlFor="currentappdate" className="form-label mt-3">Appoinment date in Current Department:</label>
        <DatePicker
  id="currentappdate"
  name="currentappdate"
  selected={currentappdate}
  onChange={(date) => setCurrentappdate(date)}
  dateFormat="dd/MM/yyyy" 
  required
  className="form-control mb-2"
/>    
       {errors.currentappdate && <div className="error">{errors.currentappdate}</div>}  
</div> 
</div>
<div className="row mb-3">
  <div className="col-md-6">
<label htmlFor="highereduq" className="form-label">Higher Educational Qualification:</label>
          <input
          type="text"
          id="highereduq"
          name="highereduq"
         value={highereduq}
        onChange={(e) => setHighereduq(e.target.value)}
         required
            className="form-control mb-2"
        />
        {errors.highereduq && <div className="error">{errors.highereduq}</div>}
</div>
</div>
<div className="row mb-3">
<div className="col-md-6">
<label htmlFor="otherdetails" className="form-label">Other details:</label>
          <input
          type="text"
          id="otherdetails"
          name="otherdetails"
         value={otherdetails}
        onChange={(e) => setOtherdetails(e.target.value)}
         required
            className="form-control mb-2"
        />
        {errors.otherdetails && <div className="error">{errors.otherdetails}</div>}
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
export default RegisterForm;



