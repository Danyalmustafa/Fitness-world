import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: "url('http://localhost:3000/background.jpg')" }}

    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-6 bg-gray-800 bg-opacity-80">
        <h1 className="text-2xl font-bold tracking-wide text-fade-gold">
          FITNESS FIT
        </h1>
        <div className="space-x-8 text-lg">
          <Link to="/" className="hover:text-gold transition duration-300">Home</Link>
          <Link to="/reservations" className="hover:text-gold transition duration-300">Reservations</Link>
          <Link to="/menu" className="hover:text-gold transition duration-300">Menu</Link>
          <Link to="/blog" className="hover:text-gold transition duration-300">Blog</Link>
          <Link to="/features" className="hover:text-gold transition duration-300">Features</Link>
          <Link to="/shop" className="hover:text-gold transition duration-300">Shop</Link>
          <Link to="/contact" className="hover:text-gold transition duration-300">Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center bg-gray-800 bg-opacity-60 px-6 py-4 rounded-lg">
        <h2 className="text-6xl font-serif text-gold">Welcome</h2>
        <h1 className="text-5xl font-bold tracking-wider mt-2">FITNESS FIT</h1>
        <p className="text-gray-300 text-lg mt-2">Ready To Be healthy</p>

        {/* Explore Button */}
        <button className="mt-6 bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition">
          Explore
        </button>
      </div>
    </div>
  );
}

export default Navbar;