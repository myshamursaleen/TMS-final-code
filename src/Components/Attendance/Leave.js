import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const LeaveForm = ({empno}) => {

    const [applydate, setApplyDate] = useState('');
    const [leaveFromDate, setLeaveFromDate] = useState('');
    const [leaveToDate, setLeaveToDate] = useState('');
    const [leaveDays, setLeaveDays] = useState('');
    const [dutyAssumingDate, setDutyAssumingDate] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = (event) => {
        event.preventDefault();
        const newErrors = {};
  // if (!empno) newErrors.empno = 'Please enter the Driver Employee No.';
        if (!leaveFromDate) newErrors.leaveFromDate= 'Please enter Leave start date.' ;
        if (!leaveToDate) newErrors.leaveToDate = 'Please enter leave end date' ;
        if (!leaveDays) newErrors.leaveDays = 'Enter Number of leave days' ;
        if (!dutyAssumingDate) newErrors.dutyAssumingDate = 'Enter Duty assuming date' ;
        setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
  

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validateForm(event);
        const currentDate = new Date();
        setApplyDate(currentDate.toLocaleDateString());
        
    if (!isValid) {
      return;
    }

    try {
        const response = await axios.post('/api1/LeaveSubmit', {
          employeeno: empno,
            applydate,
          leaveFromDate,
          leaveToDate,
          leaveDays,
          dutyAssumingDate,
        });
        
    console.log(response.data);  

    // Reset form and display success message('');
    setApplyDate('');
    setLeaveFromDate('');
    setLeaveToDate('');
    setLeaveDays('');
    setDutyAssumingDate('');
    setErrors({});   
    alert("Leave submitted successfully!");
  } 
  catch (error) 
  {
  console.log('Date:', applydate);
  console.log('Leave from:', leaveFromDate);
  console.log("Leave To:", leaveToDate);
  console.log('No of days:', leaveDays);
  console.log("Duty Assuming Date:", dutyAssumingDate);
  console.error('Error submitting Leave details:', error);
}
};
      
      const handleCancel = (event) => {
        event.preventDefault();
        // Reset the form fields and errors when "Cancel" is clicked
        setLeaveFromDate('');
        setLeaveToDate('');
        setLeaveDays('');
        setDutyAssumingDate('');
        setErrors({});
        
        };
        

      return (
        <div>
        <h3>Leave</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            
            <p>Date: {applydate}</p>
            <label htmlFor="leaveFromDate" className="form-label">
              Leave From:
            </label>
            <input
              type="date"
              id="leaveFromDate"
              value={leaveFromDate}
              onChange={(e) => setLeaveFromDate(e.target.value)}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="leaveToDate">Leave To:</label>
            <input
              type="date"
              id="leaveToDate"
              value={leaveToDate}
              onChange={(e) => setLeaveToDate(e.target.value)}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="leaveDays">Number of Days:</label>
            <input
              type="number"
              id="leaveDays"
              value={leaveDays}
              onChange={(e) => setLeaveDays(e.target.value)}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="dutyAssumingDate">Duty Assuming Date:</label>
            <input
              type="date"
              id="dutyAssumingDate"
              value={dutyAssumingDate}
              onChange={(e) => setDutyAssumingDate(e.target.value)}
            />
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
  export default LeaveForm;
  