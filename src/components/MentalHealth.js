import React, { useState, useEffect } from "react";
import Chatbot from "./Chatbot"; // ✅ Import the Chatbot component
import "./MentalHealth.css";

// ✅ Moving the mental health tips array outside the component
const mentalHealthTips = [
  "Take a deep breath and focus on the present moment.",
  "Go for a short walk outside to refresh your mind.",
  "Practice gratitude by writing down three things you're grateful for.",
  "Limit social media time and take breaks from screens.",
  "Listen to calming music or nature sounds.",
  "Drink enough water and eat a nutritious meal.",
  "Practice deep breathing exercises for 5 minutes."
];

const MentalHealth = () => {
  // ✅ State for daily tip and mood tracking
  const [dailyTip, setDailyTip] = useState("");
  const [mood, setMood] = useState("");

  // ✅ useEffect now runs only once, no more dependency warnings!
  useEffect(() => {
    const randomTip = mentalHealthTips[Math.floor(Math.random() * mentalHealthTips.length)];
    setDailyTip(randomTip);
  }, []);

  // Mood tracking handler
  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  return (
    <div className="mental-health-container">
      <h1>Mental Health & Well-being</h1>
      
      {/* ✅ Daily Wellness Tip */}
      <div className="daily-tip">
        <h2>Daily Mental Wellness Tip</h2>
        <p>{dailyTip}</p>
      </div>

      {/* ✅ Mood Tracker */}
      <div className="mood-tracker">
        <h2>How Are You Feeling Today?</h2>
        <select value={mood} onChange={handleMoodChange}>
          <option value="">Select your mood</option>
          <option value="happy">😊 Happy</option>
          <option value="stressed">😟 Stressed</option>
          <option value="calm">😌 Calm</option>
          <option value="sad">😢 Sad</option>
          <option value="energetic">💪 Energetic</option>
        </select>
        {mood && <p>You are feeling: <strong>{mood}</strong></p>}
      </div>

      {/* ✅ Meditation Guides */}
      <div className="meditation-guides">
        <h2>Guided Meditation</h2>
        <p>Follow along with these guided meditation videos:</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/6p_yaNFSYao" title="Guided Meditation" allowFullScreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/inpok4MKVLM" title="5 Minute Meditation" allowFullScreen></iframe>
      </div>

      {/* ✅ Stress Relief Exercises */}
      <div className="stress-relief">
        <h2>Stress Relief Exercises</h2>
        <p>Try this simple breathing exercise:</p>
        <ol>
          <li>Inhale deeply through your nose for 4 seconds.</li>
          <li>Hold your breath for 4 seconds.</li>
          <li>Exhale slowly through your mouth for 4 seconds.</li>
          <li>Repeat 5 times.</li>
        </ol>
      </div>

      {/* ✅ AI Mental Health Chatbot */}
      <div className="chatbot-section">
        <h2>Chat with Our Mental Health Assistant</h2>
        <Chatbot />  {/* ✅ Chatbot is now integrated */}
      </div>
    </div>
  );
};

export default MentalHealth;


