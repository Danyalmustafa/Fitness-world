import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: "url('/background.jpg')" }}

    >
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

export default Home;