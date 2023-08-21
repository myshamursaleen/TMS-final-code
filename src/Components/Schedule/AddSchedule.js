import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function ScheduleAdd() {
const [scheduleid, setScheduleid] = useState('');
const [selectedDate, setSelectedDate] = useState('');
const [availableDrivers, setAvailableDrivers] = useState([]);
const [pschedule, setPschedule] = useState('');
const [schstartd, setSchestartd] = useState('');
const [schStarttime, setschstarttime] = useState('');
const [schenddate, setScheenddate] = useState('');
const [jstartfrom, setJstartfrom] = useState('');
const [jto, setJto] = useState('');
const [errors, setErrors] = useState({});

const validateForm = (event) => {
    event.preventDefault(); // Prevent form submission if validation fails

if ( selectedDate === '') {
    setErrors((prevErrors) => ({ ...prevErrors, selectedDate: 'Please enter schedule created date'}));
    return;
}

if ( availableDrivers === '') {
  setErrors((prevErrors) => ({ ...prevErrors, availableDrivers: 'Please enter schedule created date'}));
  return;
}

if ( pschedule === '') {
    setErrors((prevErrors) => ({ ...prevErrors, pschedule: 'Please enter the purpose of the journey'}));
    return;
}
if ( schstartd === '') {
    setErrors((prevErrors) => ({ ...prevErrors, schstartd: 'Enter the Schedule start date'}));
    return;
  }
  if ( schStarttime === '') {
    setErrors((prevErrors) => ({ ...prevErrors, schStarttime: 'Enter the chedulestart time'}));
    return;
  }
  if ( schenddate === '') {
    setErrors((prevErrors) => ({ ...prevErrors, schenddate: 'Enter the schedule end date'}));
    return;
  }
  if ( jstartfrom === '') {
    setErrors((prevErrors) => ({ ...prevErrors, jstartfrom: 'Enter journey starting point '}));
    return;
  }
  if ( jto === '') {
    setErrors((prevErrors) => ({ ...prevErrors, jto: 'Enter journey end point'}));
    return;
  }

console.log('Schedule Id.:', scheduleid);
console.log('Schedule created date:', selectedDate);
console.log('Purpose of the schedule:', availableDrivers);
console.log('Purpose of the schedule:', pschedule);
console.log("schedule start date:", schstartd);
console.log('schedule start time:', schStarttime);
console.log('schedule end date:', schenddate);
console.log("journey starts from:", jstartfrom);
console.log("journey ends at:", jto);

setScheduleid('');
setSelectedDate('');
setAvailableDrivers('');
setPurposesche('');
setSchestartd('');
setschstarttime('');
setScheenddate('');
setJstartfrom('');
setJto('');
setErrors({});
alert("scheule created successfully!");
};

useEffect(() => {
  fetchAvailableDrivers(selectedDate);
}, [selectedDate]);

const fetchAvailableDrivers = async (date) => {
  try {
    // Fetch available driver names from the server based on the selected date
    const response = await axios.get(`/api/AvailableDrivers?date=${date}`);
    setAvailableDrivers(response.data); // Assuming the response contains driver names
  } catch (error) {
    console.error('Error fetching available drivers:', error);
  }
};

return (
  <div className="container">
    <h2>Schedule Details</h2>
    <form onSubmit={validateForm}>
      {/* Rest of your form inputs */}
      <div className="form-group">
        <label htmlFor="scheduleid">Schedule ID:</label>
        <input
          type="number"
          className="form-control"
          id="scheduleid"
          name="scheduleid"
          value={scheduleid}
          onChange={(e) => setScheduleid(e.target.value)}
          required
        />
        {errors.scheduleid && <div className="text-danger">{errors.scheduleid}</div>}
      </div>

    <label htmlFor="purposesche">Schedule purpose:</label>
    <input
      type="text"
      id="purposesche"
      name="purposesche"
      value={purposesche}
      onChange={(e) => setPurposesche(e.target.value)}
      required
    />
    {errors.purposesche && <div className="error">{errors.purposesche}</div>}

     <label htmlFor="schstartd">Schedule start date:</label>
      <input
      type="date"
      id="schstartd"
      name="schstartd"
     value={schstartd}
    onChange={(e) => setSchestartd(e.target.value)}
    required
    />
    {errors.vehitime && <div className="error">{errors.vehitime}</div>}

     <label htmlFor="schestatime">:</label>
      <input
      type="text"
      id="schestatime"
      name="schestatime"
     value={schestatime}
    onChange={(e) => setschestatime(e.target.value)}
    required
    />
    {errors.schestatime && <div className="error">{errors.schestatime}</div>}

<label htmlFor="scheenddate">Scheule end date:</label>
      <input
      type="text"
      id="scheenddate"
      name="scheenddate"
     value={scheenddate}
    onChange={(e) => setScheenddate(e.target.value)}
    required
    />
    {errors.scheenddate && <div className="error">{errors.scheenddate}</div>}

<label htmlFor="jstartfrom">journey starts from:</label>
      <input
      type="text"
      id="jstartfrom"
      name="jstartfrom"
     value={jstartfrom}
    onChange={(e) => setJstartfrom(e.target.value)}
    required
    />
    {errors.jstartfrom && <div className="error">{errors.jstartfrom}</div>}

<label htmlFor="jto">journey starts from:</label>
      <input
      type="text"
      id="jto"
      name="jto"
     value={jto}
    onChange={(e) => setJto(e.target.value)}
    required
    />
    {errors.jto && <div className="error">{errors.jto}</div>}

    <label htmlFor="selectedDate">Select Date:</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        required
      />
      {errors.selectedDate && <div className="error">{errors.selectedDate}</div>}
  
      <label htmlFor="driver">Select Driver:</label>
      <select
        id="driver"
        name="driver"
        value={selectedDriver}
        onChange={(e) => setSelectedDriver(e.target.value)}
        required
      >
        <option value="">Select a driver</option>
        {availableDrivers.map((driver, index) => (
          <option key={index} value={driver.id}>
            {driver.name}
          </option>
        ))}
      </select>
      {errors.selectedDriver && <div className="error">{errors.selectedDriver}</div>}
     

      <Button variant="primary" type="submit">
          Save
        </Button>
        <Button variant="secondary" className="ml-2">
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default ScheduleAdd;