// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Order from "./components/Order";
import About from "./components/About";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <Router>
        {/* <NavigationBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;