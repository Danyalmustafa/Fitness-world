import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Reservation from "./components/Reservations";
import Menu from "./components/Menu"; 
import Blog from "./components/Blog"; 

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
