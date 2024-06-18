import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Loader from "./component/Loader.jsx";
import { User } from "./User/User.jsx";
import BookDetails from "./User/BookDetails.jsx";

// Lazy-loaded components
const DashBoard = lazy(() => import("./Pages/Dashboard/DashBoard.jsx"));
const Booking = lazy(() => import("./Pages/Booking/Booking"));
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const Availability = lazy(() => import("./Pages/Available/Availibity.jsx"));
const FormPayment = lazy(() => import("./Pages/Available/FormToPayment"));

const App = () => {
  // if (condition) {

  // }
  return (
    <Router>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/" element={<DashBoard />}>
            <Route path="/user" element={<User />} />
            <Route path="/bookdetails" element={<BookDetails />} />
          </Route>
        
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
