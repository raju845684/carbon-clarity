import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import "./responsive.css";
import Home from "./pages/Home";
import About from "./pages/About";
import NavbarTop from "./components/Home/NavbarTop";

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
