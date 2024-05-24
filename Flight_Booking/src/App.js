import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking from "./Pages/Booking/Booking";
import Navbar from "./component/Navbar";
const App = () => {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="booking" element={<Booking />} />
      </Routes>
    </Router>
  );
};

export default App;
