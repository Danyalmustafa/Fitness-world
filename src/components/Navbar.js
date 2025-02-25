import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className=" top-0 left-0 w-full flex justify-between items-center px-10 py-6 bg-gray-800 bg-opacity-80">
        <h1 className="text-2xl font-bold tracking-wide text-gold">
          FITNESS FIT
        </h1>
        <div className="space-x-8 text-lg">
          <Link to="/" className="hover:text-gold transition duration-300">Home</Link>
          <Link to="/reservations" className="hover:text-gold transition duration-300">Health</Link>
          <Link to="/menu" className="hover:text-gold transition duration-300">Map</Link>
          <Link to="/blog" className="hover:text-gold transition duration-300">Blog</Link>
          <Link to="/features" className="hover:text-gold transition duration-300">Features</Link>
          <Link to="/shop" className="hover:text-gold transition duration-300">Shop</Link>
          <Link to="/contact" className="hover:text-gold transition duration-300">Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
    
    </>
  );
}

export default Navbar;