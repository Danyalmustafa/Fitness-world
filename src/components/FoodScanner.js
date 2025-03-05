import React, { useRef, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet"; // ✅ MobileNet for food recognition
import axios from "axios";

const FoodScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [detectedFoods, setDetectedFoods] = useState([]);
  const [nutritionData, setNutritionData] = useState({});
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState(null);

  // ✅ Spoonacular API Key (No Google API needed)
  const SPOONACULAR_API_KEY = "f2cf7e6b741140ed94538f1d25738037 "; 

  // 🎥 Start Camera
  const startCamera = async () => {
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream;
      }
      setStream(cameraStream);
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  // ❌ Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }
  };

  // 📷 Capture Image from Camera
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 640;
    canvas.height = 480;
    ctx.drawImage(video, 0, 0, 640, 480);

    const imgData = canvas.toDataURL("image/png");
    setImage(imgData);
  };

  // 🔍 Analyze Image using TensorFlow.js (MobileNet Model)
  const analyzeFood = async () => {
    if (!image) return;

    setLoading(true);

    try {
      // Load MobileNet Model
      const model = await mobilenet.load();
      const imgElement = document.createElement("img");
      imgElement.src = image;
      await imgElement.decode();

      // Run Image Classification
      const predictions = await model.classify(imgElement);

      // ✅ Extract detected food names
      const foodItems = predictions
        .filter(pred => pred.probability > 0.6) // Confidence filter
        .map(pred => pred.className);

      setDetectedFoods(foodItems.length > 0 ? foodItems : ["No specific food detected"]);
      setNutritionData({}); // Reset nutrition data before fetching new ones

      // ✅ Fetch full nutrition data for detected food items
      foodItems.forEach(fetchNutritionData);
    } catch (error) {
      console.error("Error detecting food:", error);
      setDetectedFoods(["Error detecting food"]);
    }

    setLoading(false);
  };

  // 🔥 Fetch Full Nutrition Data from Spoonacular API
  const fetchNutritionData = async (foodName) => {
    if (!foodName || foodName.length < 3) return;

    try {
      const searchResponse = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?query=${foodName}&apiKey=${SPOONACULAR_API_KEY}`
      );

      if (searchResponse.data.results.length > 0) {
        const foodId = searchResponse.data.results[0].id;

        const nutritionResponse = await axios.get(
          `https://api.spoonacular.com/food/ingredients/${foodId}/information?amount=100&unit=grams&apiKey=${SPOONACULAR_API_KEY}`
        );

        const nutrients = nutritionResponse.data.nutrition.nutrients;

        // Extract key nutrients
        const calories = nutrients.find(n => n.name === "Calories")?.amount || "N/A";
        const protein = nutrients.find(n => n.name === "Protein")?.amount || "N/A";
        const carbs = nutrients.find(n => n.name === "Carbohydrates")?.amount || "N/A";
        const fat = nutrients.find(n => n.name === "Fat")?.amount || "N/A";

        setNutritionData((prevData) => ({
          ...prevData,
          [foodName]: {
            calories: `${calories} kcal`,
            protein: `${protein}g`,
            carbs: `${carbs}g`,
            fat: `${fat}g`,
          },
        }));
      } else {
        setNutritionData((prevData) => ({
          ...prevData,
          [foodName]: { error: "Nutrition data not found" },
        }));
      }
    } catch (error) {
      console.error(`Error fetching nutrition for ${foodName}:`, error);
      setNutritionData((prevData) => ({
        ...prevData,
        [foodName]: { error: "Error fetching data" },
      }));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2 className="text-2xl font-bold">Food Scanner & Full Nutrition Tracker</h2>

      {/* 🎥 Live Camera Feed */}
      <video ref={videoRef} autoPlay playsInline width="300" className="rounded-lg border border-gray-300 shadow-md" />
      <br />

      {/* 🎬 Buttons */}
      <button onClick={startCamera} className="bg-blue-500 text-white px-4 py-2 m-2 rounded-lg hover:bg-blue-600 transition">
        Start Camera
      </button>
      <button onClick={stopCamera} className="bg-red-500 text-white px-4 py-2 m-2 rounded-lg hover:bg-red-600 transition">
        Stop Camera
      </button>
      <button onClick={captureImage} className="bg-green-500 text-white px-4 py-2 m-2 rounded-lg hover:bg-green-600 transition">
        Capture Image
      </button>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* 🖼 Show Captured Image */}
      {image && (
        <>
          <img src={image} alt="Captured Food" width="300" className="mt-4 rounded-lg shadow-md border border-gray-300" />
          <button onClick={analyzeFood} className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-yellow-600 transition">
            Analyze Food
          </button>
        </>
      )}

      {/* ⏳ Show Loading State */}
      {loading && <p className="text-gray-600 mt-2">Analyzing food...</p>}

      {/* 🍎 Display Detected Foods & Full Nutrition Info */}
      {detectedFoods.length > 0 && (
        <div className="mt-3">
          <h3 className="text-xl font-semibold">Detected Foods & Nutrition Info:</h3>
          <ul>
            {detectedFoods.map((food, index) => (
              <li key={index} className="text-lg text-green-600">
                {food} - {nutritionData[food]?.calories || "Fetching..."}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FoodScanner;








