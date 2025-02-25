import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-yellow-400">FITNESS FIT</Link>

      {user ? (
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/menu" className="hover:text-yellow-400 transition">Map</Link>
          <Link to="/Reservations" className="hover:text-yellow-400 transition">Health</Link>
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition">Sign Up</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
