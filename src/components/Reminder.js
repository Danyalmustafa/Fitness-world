import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti"; // ✅ Re-added confetti effect

function HydrationReminder() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [goal, setGoal] = useState(8);
  const [progress, setProgress] = useState(0);
  const [isReminderTime, setIsReminderTime] = useState(false);
  const [hydrationFact, setHydrationFact] = useState("");
  const [showConfetti, setShowConfetti] = useState(false); // ✅ Confetti state

  // ✅ Use useMemo() to prevent hydrationFacts from re-creating on every render
  const hydrationFacts = useMemo(
    () => [
      "Drinking water boosts energy and relieves fatigue!",
      "Your body is 60% water – stay hydrated!",
      "Water helps you maintain a healthy weight!",
      "Hydration improves skin health and keeps you glowing!",
      "Drinking enough water prevents headaches and fatigue.",
    ],
    []
  );

  useEffect(() => {
    setProgress((waterIntake / goal) * 100);

    // ✅ Show confetti when goal is reached
    if (waterIntake === goal) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Hide after 3s
    }

    // Set a random hydration fact every 5 seconds
    const factInterval = setInterval(() => {
      setHydrationFact(
        hydrationFacts[Math.floor(Math.random() * hydrationFacts.length)]
      );
    }, 5000);

    return () => clearInterval(factInterval);
  }, [waterIntake, goal, hydrationFacts]);

  // Function to add water intake
  const addWater = () => {
    if (waterIntake < goal) {
      setWaterIntake((prev) => prev + 1);
    }
  };

  // Function to reset water intake
  const resetWater = () => {
    setWaterIntake(0);
    setShowConfetti(false); // Hide confetti when reset
  };

  // Request notification permission once when component mounts
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Send hydration reminders every 3 hours
  useEffect(() => {
    const reminderInterval = setInterval(() => {
      if (Notification.permission === "granted") {
        new Notification("💧 Stay Hydrated!", {
          body: "Time to drink some water! Keep your body refreshed.",
        });
      }
      setIsReminderTime(true);
      setTimeout(() => setIsReminderTime(false), 1500);
    }, 3 * 60 * 60 * 1000); // Every 3 hours

    return () => clearInterval(reminderInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-100 p-6"
    >
      {/* ✅ Confetti Effect */}
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-full"
      >
        {/* Pulsing Effect for Reminder */}
        <motion.h1
          animate={isReminderTime ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.8, repeat: isReminderTime ? Infinity : 0 }}
          className="text-3xl font-bold text-blue-600"
        >
          Hydration Reminder 💧
        </motion.h1>
        <p className="text-gray-600 mt-2">Track your daily water intake</p>

        {/* Water Glass Animation */}
        <div className="relative w-40 h-40 bg-blue-200 rounded-b-full overflow-hidden mt-4 border-4 border-blue-400 shadow-md">
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 w-full bg-blue-500"
          ></motion.div>
        </div>

        {/* Water Intake Counter */}
        <motion.div
          key={waterIntake}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="mt-4"
        >
          <p className="text-xl font-semibold">{waterIntake} / {goal} cups</p>
        </motion.div>

        {/* Buttons with Hover & Click Animations */}
        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={addWater}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            + Add Cup
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: [-5, 5, -5, 5, 0] }}
            onClick={resetWater}
            className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Reset
          </motion.button>
        </div>

        {/* Custom Goal Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6"
        >
          <label className="text-gray-700 font-semibold">Set Daily Goal:</label>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-20 text-center"
            min="1"
          />
          <span className="text-gray-500 ml-2">cups</span>
        </motion.div>

        {/* Hydration Fact Display (Fixed Size) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-4 text-center italic text-blue-600"
          style={{ minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {hydrationFact}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default HydrationReminder;






