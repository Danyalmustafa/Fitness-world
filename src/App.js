import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Reservations from "./components/Reservations";
import Menu from "./components/Menu"; 
import Blog from "./components/Blog"; 
import Reminder from "./components/Reminder"; // ✅ Reminder Page
import FoodScanner from "./components/FoodScanner"; // ✅ Food Scanner Page
import MentalHealth from "./components/MentalHealth"; // ✅ Mental Health Page
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider, useAuth } from "./components/AuthProvider"; 
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthHandler />
      </Router>
    </AuthProvider>
  );
}

// ✅ Authentication Handler (Redirects users if not logged in)
const AuthHandler = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path="/reminder" element={<ProtectedRoute><Reminder /></ProtectedRoute>} /> 
        <Route path="/scanner" element={<ProtectedRoute><FoodScanner /></ProtectedRoute>} /> {/* ✅ Food Scanner Route */}
        <Route path="/mental-health" element={<ProtectedRoute><MentalHealth /></ProtectedRoute>} /> {/* ✅ Mental Health Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
