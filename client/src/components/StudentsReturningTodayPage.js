import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentsReturningTodayPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWarden, setSelectedWarden] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('loggedIn');
    if (loggedInStatus === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const login = () => {
    if (username === 'aitpune' && password === '885522') {
      setLoggedIn(true);
      sessionStorage.setItem('loggedIn', 'true');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  useEffect(() => {
    if (loggedIn && selectedWarden) {
      const fetchStudentsReturningToday = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/students-returning-today?warden=${selectedWarden}`);
          setStudents(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching students returning today:', error);
          setLoading(false);
        }
      };

      fetchStudentsReturningToday();
    } else {
      setStudents([]);
      setLoading(false);
    }
  }, [loggedIn, selectedWarden]); // Fetch students when loggedIn or selectedWarden changes

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete-student/${id}`);
      // Remove the deleted student from the local state
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleWardenChange = (event) => {
    setSelectedWarden(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      {!loggedIn ? (
        <div>
          <h2>Login</h2>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={handleUsernameChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button onClick={login}>Login</button>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold my-4">Students Leave Returning Date Page</h2>
          <div className="my-4">
            <label className="mr-2">Select Warden:</label>
            <select value={selectedWarden} onChange={handleWardenChange} className="border-black border px-3 py-2">
              <option value="">Select Warden</option>
              {['warden1', 'warden2', 'warden3', 'warden4'].map((warden, index) => (
                <option key={index} value={warden}>{warden}</option>
              ))}
            </select>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {selectedWarden && students.length === 0 ? (
                <p>No students are returning today for {selectedWarden}.</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year of Study</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returning Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{student.registrationNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.yearOfStudy}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(student.hostelReturningDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            onChange={() => handleDelete(student._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentsReturningTodayPage;
