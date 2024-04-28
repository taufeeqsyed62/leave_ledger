import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormFillingPage from './components/FormFillingPage';
import StudentsReturningTodayPage from './components/StudentsReturningTodayPage';
import StudentsOnLeavePage from './components/students-on-leave'; // Import StudentsOnLeavePage component

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<FormFillingPage />} />
            <Route path="/students-returning-today" element={<StudentsReturningTodayPage />} />
            <Route path="/students-on-leave" element={<StudentsOnLeavePage />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
