import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function VehicleRegisterForm() {
    const [vehicleno, setVehicleno] = useState('');
    const [vehitype, setVehitype] = useState('');
    const [vehiclass, setVehiclass] = useState('');
    const [oiltype,setOiltype] = useState('');
    const [insuranceno,setInsuranceno] = useState('');
    const [insexpmonth, setInsExpmonth] = useState(null);
    const [inscom, setInscom] = useState('');
    const [enginno, setenginno] = useState('');
    const [manuyear, setManuyear] = useState(null);
    const [fregisterdate, setfregisterdate] = useState(null);
    const [tyresize, setTyresize] = useState('');
    const [battsize, setBattsize] = useState('');
    const [vlicenseno, setVehiLicenseno] = useState('');
    const [liceexpmonth, setLicexpmonth] = useState(null);
    const [votherdetails, setVotherdetails] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = (event) => {
      event.preventDefault();
      const newErrors = {};
// if (!empno) newErrors.empno = 'Please enter the Driver Employee No.';
      if (!vehicleno) newErrors.vehicleno= 'Please enter the vehicle No.' ;
      if (!vehitype) newErrors.vehitype = 'Please enter the Vehicle type' ;
      if (!vehiclass) newErrors.vehiclass = 'Enter the vehicle class' ;
      if (!oiltype) newErrors.oiltype = 'Enter the vehicle class' ;
      if (!insuranceno) newErrors.insuranceno= 'Please enter the insurance no' ;
      if (!insexpmonth) newErrors.insexpmonth= 'Please enter the insurance expiery month' ;
      if (!inscom) newErrors.inscom= 'Please enter the insurance company name' ;
      if (!enginno) newErrors.enginno= 'Please enter the engine no.' ;
      if (!manuyear) newErrors.manuyear= 'Please enter a valid year' ;
      if (!fregisterdate) newErrors.fregisterdate= 'Please enter the 1st registered date' ;
      if (!tyresize) newErrors.tyresize= 'Please enter the tyre size' ;
      if (!battsize) newErrors.battsize= 'Please enter the battary size' ;
      if (!vlicenseno) newErrors.vehilicencenovehilicenceno= 'Please enter vehicle licence no.' ;
      if (!liceexpmonth.test(liceexpmonth)) newErrors.liceexpmonth= 'Please enter the license exp month' ;
          
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
const response = await axios.post ('http://localhost:3001/api1/addvehicle', { 
vehicleno,
vehitype,
vehiclass,
oiltype,
insuranceno,
insexpmonth,
inscom, 
enginno, 
manuyear, 
fregisterdate,
tyresize, 
battsize,
vlicenseno,
liceexpmonth, 
votherdetails,
    }
    );
        
    console.log(response.data);  

    // Reset form and display success message('');
    setVehicleno('');
    setVehitype('');
    setVehiclass('');
    setOiltype('');
    setInsuranceno('');
    setInsExpmonth('');
    setInscom('');
    setenginno('');
    setManuyear('');
    setfregisterdate('');
    setTyresize('');
    setBattsize('');
    setVehiLicenseno('');
    setLicexpmonth('');
    setVotherdetails('');
    setErrors({});   
    alert("Vehicle details submitted successfully!");
  } 
  catch (error) 
  {
  console.log('Vehicle No.:', vehicleno);
  console.log('Vehicle Type:', vehitype);
  console.log("Vehicle class:", vehiclass);
  console.log('Oil Type:', oiltype);
  console.log("Insurance No:", insuranceno);
  console.log('Insurance Expiery Month:', insexpmonth);
  console.log('Insurance Company:', inscom);
  console.log('Engin No.:', enginno);
  console.log("Manufecture Year.:", manuyear);
  console.log('1st Registered Date:', fregisterdate);
  console.log('Tyre Size:', tyresize);
  console.log('Battery size:', battsize);
  console.log('Vehicle License No:', vlicenseno);  
  console.log('License Expiry Month:', liceexpmonth);
  console.error('Error submitting vehicle details:', error);
}
};

const handleCancel = (event) => {
event.preventDefault();
// Reset the form fields and errors when "Cancel" is clicked
    setVehicleno('');
    setVehitype('');
    setVehiclass('');
    setOiltype('');
    setInsuranceno('');
    setInsExpmonth('');
    setInscom('');
    setenginno('');
    setManuyear('');
    setfregisterdate('');
    setTyresize('');
    setBattsize('');
    setVehiLicenseno('');
    setLicexpmonth('');
    setVotherdetails('');
    setErrors({});

};

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>Add Vehicle Details</h2>
        </div>
      </div>
      <form onSubmit={validateForm}>
      <div className="mb-3">
      <label htmlFor="vehino" className="form-label">Vehicle No:</label>
      <input
  type="Text"
  id="vehicleno"
  name="vehicleno"
  value={vehicleno}
  onChange={(e) => setVehicleno(e.target.value)} 
  required
  className="form-control"
/>

{errors.vehicleno && <div className="error">{errors.vehicleno}</div>}
       </div>
<div className="mb-3">
        <label htmlFor="vehitype" className="form-label">Vehicle Type:</label>
        <input
          type="text"
          id="vehitype"
          name="vehitype"
          value={vehitype}
          onChange={(e) => setVehitype(e.target.value)}
          required
          className='form-control'
        />
        {errors.vehitype && <div className="error">{errors.vehitype}</div>}
</div>
<div className="mb-3">
         <label htmlFor="vehiclass" className="form-label">Vehicle Class:</label>
          <input
          type="text"
          id="vehiclass"
          name="vehiclass"
         value={vehiclass}
        onChange={(e) => setVehiclass(e.target.value)}
        required
        className="form-control"
        />
        {errors.vehiclass && <div className="error">{errors.vehiclass}</div>}
</div>
<div className="mb-3">
         <label htmlFor="oiltype" className="form-label">Fuel Type:</label>
          <input
          type="text"
          id="oiltype"
          name="oiltype"
         value={oiltype}
        onChange={(e) => setOiltype(e.target.value)}
        required
        className="form-control"
        />
        {errors.oiltype && <div className="error">{errors.oiltype}</div>}
</div>
<div className="mb-3">
         <label htmlFor="insuranceno" className="form-label">Insurance No:</label>
          <input
          type="Text"
          id="insuranceno"
          name="insuranceno"
         value={insuranceno}
        onChange={(e) => setInsuranceno(e.target.value)}
        required
        className="form-control"
        />
        {errors.insuranceno && <div className="error">{errors.insuranceno}</div>}
</div>
<div className="mb-3">
        <label htmlFor="insexpmonth" className="form-label">Insurance Expiry Month:</label>
        <DatePicker
  id="insexpmonth"
  name="insexpmonth"
  selected={fregisterdate}
  onChange={(date) => setfregisterdate(date)}
  dateFormat="dd/MM/yyyy" 
  required
  className="form-control"
/>       
       {errors.insexpmonth && <div className="error">{errors.insexpmonth}</div>}
</div>
<div className="mb-3">
      <label htmlFor="inscom" className="form-label">Insurance Company Name:</label>
        <input
          id="inscom"
          name="inscom"
          value={inscom}
          onChange={(e) => setInscom(e.target.value)}
          required
          className="form-control"
          />
        {errors.inscom && <div className="error">{errors.inscom}</div>}
</div>
<div className="mb-3">
      <label htmlFor="enginno" className="form-label">Engine No.:</label>
       <input
         type="text"
         id="enginno"
         name="enginno"
         value={enginno}
         onChange={(e) => setenginno(e.target.value)}
         required
         className="form-control"
       />
        {errors.enginno && <div className="error">{errors.enginno}</div>}
</div>
<div className="mb-3">
        <label htmlFor="Manuyear" className="form-label">Manufactured Year:</label>
        <input
         type="number"
         id="Manuyear"
         name="Manuyear"
         value={manuyear}
         onChange={(e) => setManuyear(e.target.value)}
        required
        className="form-control"
        />
        {errors.manuyear && <div className="error">{errors.manuyear}</div>}
</div>
<div className="mb-3">
<label htmlFor="fregdate" className="form-label">1st registered date of the vehicle:</label>
<DatePicker
  id="fregdate"
  name="fregdate"
  selected={fregisterdate}
  onChange={(date) => setfregisterdate(date)}
  dateFormat="dd/MM/yyyy" // Set the desired date format
  required
  className="form-control"
/>
{errors.fregisterdate && <div className="error">{errors.fregisterdate}</div>}
</div>
<br /> 
<div className="mb-3">
        <label htmlFor="tyresize" className="form-label">Tyre size:</label>
        <input
         type="text"
         id="tyresize"
          name="tyresize"
        value={tyresize}
        onChange={(e) => setTyresize(e.target.value)}
         required
         className="form-control"
        />
        {errors.tyresize && <div className="error">{errors.tyresize}</div>} 
</div>
<br /> 
<div className="mb-3">
        <label htmlFor="battsize" className="form-label">Battery size:</label>
        <input
         type="text"
         id="battsize"
          name="battsize"
        value={battsize}
        onChange={(e) => setBattsize(e.target.value)}
        required
        className="form-control"
        />
        {errors.battsize && <div className="error">{errors.battsize}</div>} 
</div>
<div className="mb-3">
        <label htmlFor="vlicenseno" className="form-label">License No:</label>
         <input
         type="text"
         id="vlicenseno"
         name="vlicenseno"
        value={vlicenseno}
        onChange={(e) => setVehiLicenseno(e.target.value)}
        required
        className="form-control"
        />
        {errors.vlicenseno && <div className="error">{errors.vlicenseno}</div>}
</div>
<div className="mb-3">
        <label htmlFor="liceexpmonth" className="form-label">License expiry month:</label>
        <DatePicker
  id="licenexpmonth"
  name="licenexpmonth"
  selected={liceexpmonth}
  onChange={(date) => setLicexpmonth(date)}
  dateFormat="dd/MM/yyyy" // Set the desired date format
  required
  className="form-control"
/>
        {errors.liceexpmonth && <div className="error">{errors.liceexpmonth}</div>}    
</div>
<div className="mb-3">
        <label htmlFor="votherdetails" className="form-label">Other details about the vehicle:</label>
        <input
         type="text"
         id="votherdetails"
         name="votherdetails"
         value={votherdetails}
        onChange={(e) => setVotherdetails(e.target.value)}
         required
         className="form-control"
        />
        {errors.votherdetails && <div className="error">{errors.votherdetails}</div>}      
</div>
<div className="d-flex justify-content-end">
  <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
    Cancel
  </button>
  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
    Submit
  </button>
</div>
</form>
</div>
  );
}
export default VehicleRegisterForm;