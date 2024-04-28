import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentsOnLeavePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWarden, setSelectedWarden] = useState('');
  const wardens = ['warden1', 'warden2', 'warden3', 'warden4']; // Add wardens list

  useEffect(() => {
    if (selectedWarden) {
      const fetchStudentsOnLeave = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/students-on-leave?warden=${selectedWarden}`);
          setStudents(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching students on leave:', error);
          setLoading(false);
        }
      };

      fetchStudentsOnLeave();
    } else {
      setStudents([]);
      setLoading(false);
    }
  }, [selectedWarden]); // Fetch students when selectedWarden changes

  const handleWardenChange = (event) => {
    setSelectedWarden(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold my-4">Students on Leave</h2>
      <div className="my-4">
        <label className="mr-2">Select Warden:</label>
        <select value={selectedWarden} onChange={handleWardenChange} className="border border-gray-300 rounded px-3 py-2">
          <option value="">All Wardens</option>
          {wardens.map((warden, index) => (
            <option key={index} value={warden}>{warden}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {selectedWarden && students.length === 0 ? (
            <p>No students on leave for {selectedWarden}.</p>
          ) : (
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year of Study</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returning Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{student.registrationNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.yearOfStudy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(student.hostelReturningDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentsOnLeavePage;
