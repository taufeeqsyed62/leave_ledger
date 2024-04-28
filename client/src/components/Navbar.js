import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <ul className="flex justify-center">
          <li className="mr-6">
            <Link to="/" className="text-white hover:text-gray-300">Form Filling Page</Link>
          </li>
          <li className="mr-6">
            <Link to="/students-returning-today" className="text-white hover:text-gray-300">Returning</Link>
          </li>
          <li>
            <Link to="/students-on-leave" className="text-white hover:text-gray-300">Students on Leave</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
