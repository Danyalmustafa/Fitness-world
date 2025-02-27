import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const aboutRef = useRef(null); // Reference for scrolling

  const handleAboutClick = () => {
    setShowAbout(!showAbout); // Toggle section

    // If opening the section, scroll to it after a slight delay
    if (!showAbout) {
      setTimeout(() => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200); // Delay to ensure content is visible
    }
  };

  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      //style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Main Content */}
      <div className="text-center bg-gray-800 bg-opacity-60 px-6 py-4 rounded-lg">
        <h2 className="text-6xl font-serif text-yellow-400">Welcome</h2>
        <h1 className="text-5xl font-bold tracking-wider mt-2">FITNESS FIT</h1>
        <p className="text-gray-300 text-lg mt-2">Ready To Be Healthy</p>

        {/* About Us Button */}
        <button 
          onClick={handleAboutClick}
          className="mt-6 bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition"
        >
          About us
        </button>
      </div>

      {/* About Us Section (Fades in on Click & Scrolls Down) */}
      {showAbout && (
        <motion.div
          ref={aboutRef} // Reference for scrolling
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="mt-10 w-3/4 p-6 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg text-center"
        >
          <h2 className="text-3xl font-bold text-yellow-400">Why We Want to Help</h2>
          <p className="mt-2 text-lg text-gray-300">
            Our goal is to empower people to live healthier lives by offering 
            personalized fitness tracking, expert nutrition tips, and motivation 
            for daily wellness habits.
          </p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-4">How We Achieve This</h2>
          <p className="mt-2 text-lg text-gray-300">
            - Helping you track calories, vitamins, and healthy food choices. <br />
            - Providing exercise plans and lifestyle tips. <br />
            - Encouraging daily wellness challenges with rewards.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Home;
