import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Reservations from "./components/Reservations";
import Menu from "./components/Menu"; 
import Blog from "./components/Blog"; 
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider, useAuth } from "./components/AuthProvider"; // Ensure correct path
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure correct path

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthHandler />
      </Router>
    </AuthProvider>
  );
}

// New component to handle initial authentication check
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
