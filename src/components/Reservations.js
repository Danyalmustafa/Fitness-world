import React, { useState, useEffect } from "react";

const DietPlan = () => {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [weight, setWeight] = useState(70); // in kg
  const [height, setHeight] = useState(170); // in cm
  const [goal, setGoal] = useState("maintain"); // weight loss, maintain, gain
  const [dietType, setDietType] = useState("balanced");

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

  const dailyCalories = calculateCalories();

  const macros = {
    carbs: Math.round((dailyCalories * 0.40) / 4),
    protein: Math.round((dailyCalories * 0.30) / 4),
    fats: Math.round((dailyCalories * 0.30) / 9),
  };

  const mealPlans = {
    balanced: {
      breakfast: "Oatmeal with banana & almond butter",
      lunch: "Grilled chicken with quinoa & veggies",
      dinner: "Salmon with sweet potatoes & broccoli",
    },
    vegetarian: {
      breakfast: "Greek yogurt with nuts & berries",
      lunch: "Quinoa & chickpea salad",
      dinner: "Lentil soup with whole wheat toast",
    },
    vegan: {
      breakfast: "Smoothie with almond milk, banana, and chia seeds",
      lunch: "Tofu stir-fry with brown rice",
      dinner: "Stuffed bell peppers with quinoa & black beans",
    },
    keto: {
      breakfast: "Scrambled eggs with avocado",
      lunch: "Grilled chicken with spinach & cheese",
      dinner: "Salmon with roasted asparagus & olive oil",
    },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="diet-plan-container">
      <h1 className="title">Personalized Diet Plan</h1>

      <div className="form-section">
        <div className="input-group">
          <label>Age: {age}</label>
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

      <div className="summary-box">
        <h2>Daily Caloric Needs: {dailyCalories} kcal</h2>
      </div>

      <div className="macro-box">
        <h3>Macronutrient Breakdown</h3>
        <p>Carbohydrates: {macros.carbs}g</p>
        <p>Protein: {macros.protein}g</p>
        <p>Fats: {macros.fats}g</p>
      </div>

      <div className="meal-box">
        <h3>Recommended Meal Plan</h3>
        <p><strong>Breakfast:</strong> {mealPlans[dietType].breakfast}</p>
        <p><strong>Lunch:</strong> {mealPlans[dietType].lunch}</p>
        <p><strong>Dinner:</strong> {mealPlans[dietType].dinner}</p>
      </div>

      <style jsx>{`
        .diet-plan-container {
          max-width: 700px;
          margin: 20px auto;
          text-align: center;
          padding: 30px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 20px;
        }

        .input-group {
          text-align: left;
          font-size: 18px;
        }

        .input-group label {
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
        }

        select, input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .summary-box, .macro-box, .meal-box {
          background: #f4f4f4;
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
          font-size: 18px;
        }

        @media (max-width: 600px) {
          .diet-plan-container {
            width: 90%;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default DietPlan;
