import React, { useRef, useState } from "react";
import axios from "axios";

const FoodScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [detectedFoods, setDetectedFoods] = useState([]);
  const [nutritionData, setNutritionData] = useState({});
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState(null); // Store camera stream

  // ✅ Replace with your actual API Keys
  const GOOGLE_API_KEY = "AIzaSyBLtUTqJQ-pX6jhTLbOzojEdPVgmqqC-3U"; // Google Vision API Key
  const SPOONACULAR_API_KEY = "f2cf7e6b741140ed94538f1d25738037 "; // Spoonacular API Key

  // 🎥 Start Camera
  const startCamera = async () => {
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream;
      }
      setStream(cameraStream); // Store stream to stop it later
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  // ❌ Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); // Stop all video tracks
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null); // Reset stream state
    }
  };

  // 📷 Capture Image from Camera
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    // Resize image for better detection
    canvas.width = 640;
    canvas.height = 480;
    ctx.drawImage(video, 0, 0, 640, 480);

    // Convert to Base64
    const imgData = canvas.toDataURL("image/png");
    setImage(imgData);
  };

  // 🔍 Analyze Image with Google Vision API
  const analyzeFood = async () => {
    if (!image) return;

    setLoading(true);
    const base64Image = image.split(",")[1];

    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
        {
          requests: [
            {
              image: { content: base64Image },
              features: [
                { type: "WEB_DETECTION", maxResults: 10 },
                { type: "LABEL_DETECTION", maxResults: 10 },
              ],
            },
          ],
        }
      );

      // ✅ Extract detected food items
      const webEntities = response.data.responses[0]?.webDetection?.webEntities || [];
      const labels = response.data.responses[0]?.labelAnnotations || [];

      // ✅ List of generic words to exclude
      const genericWords = ["fruit", "food", "natural foods", "plant", "dish", "meal", "produce", "ingredient", "citrus"];

      // ✅ Filter and prioritize specific food items
      const foodItems = [...webEntities, ...labels]
        .filter(item => item.score > 0.7 && !genericWords.includes(item.description.toLowerCase()))
        .map(item => item.description);

      setDetectedFoods(foodItems.length > 0 ? foodItems : ["No specific food detected"]);
      setNutritionData({}); // Reset nutrition data before fetching new ones

      // ✅ Fetch full nutrition data for detected food items
      foodItems.forEach(fetchNutritionData);
    } catch (error) {
      console.error("Error detecting food:", error.response?.data || error);
      setDetectedFoods(["Error detecting food"]);
    }

    setLoading(false);
  };

  // 🔥 Fetch Full Nutrition Data from Spoonacular API
  const fetchNutritionData = async (foodName) => {
    if (!foodName || foodName.length < 3) return; // Ignore very short words

    try {
      // Search for food ingredient in Spoonacular database
      const searchResponse = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?query=${foodName}&apiKey=${SPOONACULAR_API_KEY}`
      );

      if (searchResponse.data.results.length > 0) {
        const foodId = searchResponse.data.results[0].id; // Get best-matching food ID

        // Fetch full nutrition details using the food ID
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






