import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Loader from "./component/Loader.jsx";
import User from "./Pages/User/User.jsx";
import BookDetails from "./Pages/User/BookDetails.jsx";

// Lazy-loaded components
const DashBoard = lazy(() => import("./Pages/Dashboard/DashBoard.jsx"));
const Booking = lazy(() => import("./Pages/Booking/Booking"));
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const Availability = lazy(() => import("./Pages/Available/Availibity.jsx"));
const FormPayment = lazy(() => import("./Pages/Available/FormToPayment"));
const UserTable = lazy(()=> import('./Pages/Dashboard/DashBoardComponent/UserTable.jsx'))
const Profile = lazy(()=> import('./Pages/Dashboard/DashBoardComponent/Profile.jsx'))
const BookingTable = lazy(()=> import('./Pages/Dashboard/DashBoardComponent/BokingTable.jsx'))
const PaymentTable = lazy(()=> import('./Pages/Dashboard/DashBoardComponent/PaymentTable.jsx'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/" element={<DashBoard />}>
            <Route path="/user" element={<User />} />
            <Route path="/usertable" element={<UserTable />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookingtable" element={<BookingTable />} />
            <Route path="/paymenttable" element={<PaymentTable />} />
          </Route>
          <Route path="/bookdetails" element={<BookDetails />} />
          <Route path="/availability/:id" element={<Availability />} />
          <Route path="/formpayment" element={<FormPayment />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
};

export default App;
