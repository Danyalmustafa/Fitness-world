import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [showAbout, setShowAbout] = useState(false);
  const aboutRef = useRef(null);
  const [quote, setQuote] = useState("");

  // List of motivational quotes
  const quotes = [
    "Your body can stand almost anything. It’s your mind you have to convince.",
    "Exercise not only changes your body, it changes your mind, your attitude, and your mood.",
    "Take care of your body. It’s the only place you have to live.",
    "Push yourself because no one else is going to do it for you.",
    "Success starts with self-discipline.",
    "Every journey begins with a single step – start today!",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Do something today that your future self will thank you for."
  ];

  // Function to get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // Change quote every 5 seconds
  useEffect(() => {
    setQuote(getRandomQuote()); // Set initial quote

    const interval = setInterval(() => {
      setQuote(getRandomQuote()); // Update quote every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleAboutClick = () => {
    setShowAbout(!showAbout);
    if (!showAbout) {
      setTimeout(() => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white">
      {/* Main Content */}
      <div 
        className="text-center bg-gray-800 bg-opacity-60 px-6 py-4 rounded-lg"
        style={{ minHeight: "250px", width: "400px" }} // Fixed size for consistency
      >
        <h2 className="text-6xl font-serif text-yellow-400">Welcome</h2>
        <h1 className="text-5xl font-bold tracking-wider mt-2">FITNESS FIT</h1>
        <p className="text-gray-300 text-lg mt-2">Ready To Be Healthy</p>

        {/* Auto-Changing Motivational Quote with Animation */}
        <div className="mt-4 h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-lg italic text-gray-300 text-center w-full"
            >
              "{quote}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* About Us Button */}
        <button 
          onClick={handleAboutClick}
          className="mt-6 bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition"
        >
          About us
        </button>
      </div>

      {/* About Us Section */}
      {showAbout && (
        <motion.div
          ref={aboutRef}
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

