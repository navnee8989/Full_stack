import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Spinners from "./Component/Spinners";

const App = () => {
  const {Loading} = useSelector((state)=> state.Alert)
  return (
    <>
      {Loading ? (
        <Spinners />
      ) : (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  );
};

export default App;
