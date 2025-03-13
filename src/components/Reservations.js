import React, { useState } from "react";
import { db, auth } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const DietPlan = () => {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [goal, setGoal] = useState("maintain");
  const [dietType, setDietType] = useState("balanced");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const calculateCalories = () => {
    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    let calories = bmr * activityMultipliers[activityLevel];

    if (goal === "lose") calories *= 0.85;
    if (goal === "gain") calories *= 1.15;

    return Math.round(calories);
  };

  const macros = {
    carbs: Math.round((calculateCalories() * 0.40) / 4),
    protein: Math.round((calculateCalories() * 0.30) / 4),
    fats: Math.round((calculateCalories() * 0.30) / 9),
  };

  const saveToFirebase = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      setMessage("⚠️ You must be logged in to save your diet plan!");
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, "dietPlans", user.uid);

    const dietData = {
      userId: user.uid,
      age,
      gender,
      activityLevel,
      weight,
      height,
      goal,
      dietType,
      dailyCalories: calculateCalories(),
    };

    try {
      await setDoc(userDocRef, dietData);
      setMessage("✅ Diet plan saved successfully!");
    } catch (error) {
      setMessage("❌ Error saving data. Please try again.");
      console.error("Error saving diet data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="diet-plan-container">
      <h1 className="title">Personalized Diet Plan</h1>

      <div className="form-section">
        <div className="input-group">
          <label>Age: <span>{age}</span></label>
          <input type="range" min="1" max="100" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="input-group">
          <label>Activity Level:</label>
          <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
            {Object.keys(activityMultipliers).map((level) => (
              <option key={level} value={level}>{level.replace("_", " ").toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Weight (kg):</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>Height (cm):</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </div>

        <div className="input-group">
          <label>Health Goal:</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Muscle</option>
          </select>
        </div>

        <div className="input-group">
          <label>Diet Preference:</label>
          <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
            <option value="balanced">Balanced</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="keto">Keto</option>
          </select>
        </div>
      </div>

      <div className="info-box">
        <h2>Daily Caloric Needs: {calculateCalories()} kcal</h2>
      </div>

      <div className="info-box">
        <h3>Macronutrient Breakdown</h3>
        <p>Carbohydrates: {macros.carbs}g</p>
        <p>Protein: {macros.protein}g</p>
        <p>Fats: {macros.fats}g</p>
      </div>

      <button className="save-button" onClick={saveToFirebase} disabled={loading}>
        {loading ? "Saving..." : "SAVE"}
      </button>

      {message && <p className="message">{message}</p>}

      <style jsx>{`
        .diet-plan-container {
          max-width: 500px;
          margin: 30px auto;
          padding: 25px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        select, input {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .info-box {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 10px;
          margin-top: 15px;
        }

        .save-button {
          background: #007bff;
          color: white;
          padding: 12px 18px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }

        .save-button:hover {
          background: #0056b3;
        }

        .message {
          margin-top: 15px;
          font-size: 14px;
          color: green;
        }
      `}</style>
    </div>
  );
};

export default DietPlan;

