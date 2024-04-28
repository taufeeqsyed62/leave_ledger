// src/App.js

import React, { useState } from 'react';
import axios from 'axios';

function FormFillingPage() {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    name: '',
    yearOfStudy: '',
    hostelLeavingDate: '',
    hostelReturningDate: '',
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/leave-entry', formData);
      alert('Leave entry submitted successfully!');
      setFormData({
        registrationNumber: '',
        name: '',
        yearOfStudy: '',
        hostelLeavingDate: '',
        hostelReturningDate: '',
       
      });
    } catch (error) {
      console.error('Error submitting leave entry:', error);
    }
  };

  return (
    <div className="container mx-auto">
    <h1 className="text-2xl font-bold my-4">Leave Entry</h1>
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
        <div>
          <label>Registration Number</label>
          <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} className="border-black border px-3 py-2" />
        </div>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border-black border px-3 py-2" />
        </div>
        <div>
  <label>Year of Study</label>
  <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className="border-black border px-3 py-2">
    <option value="">Select Year</option>
    <option value="1">1st Year</option>
    <option value="2">2nd Year</option>
    <option value="3">3rd Year</option>
    <option value="4">4th Year</option>
  </select>
</div>

        <div>
          <label>Hostel Leaving Date</label>
          <input type="date" name="hostelLeavingDate" value={formData.hostelLeavingDate} onChange={handleChange} className="border-black border px-3 py-2" />
        </div>
        <div>
          <label>Hostel Returning Date</label>
          <input type="date" name="hostelReturningDate" value={formData.hostelReturningDate} onChange={handleChange} className="border-black border px-3 py-2" />
        </div>
        <div>
  <label>Warden</label>
  <select name="warden" value={formData.warden} onChange={handleChange} className="border-black border px-3 py-2">
    <option value="">Select Warden</option>
    <option value="warden1">Warden 1</option>
    <option value="warden2">Warden 2</option>
    <option value="warden3">Warden 3</option>
    <option value="warden4">Warden 4</option>
  </select>
</div>

      
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">Submit</button>
    </form>
  </div>
  
  

  );
}

export default FormFillingPage;
