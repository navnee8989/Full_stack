import React, { useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./dashaboard.css";
import MyLogo from "../../assets/pngwing.com.png";
import UserImage from "../../assets/20231223165341_IMG_8727.JPG";
import { FaBars, FaUser } from "react-icons/fa";
import { IoIosSpeedometer } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import InventoryIcon from "@mui/icons-material/Inventory";
import { RiLogoutCircleRFill } from "react-icons/ri";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useDispatch, useSelector } from "react-redux";
import { clearBookingData } from "../../redux/features/flightSlice";

const DashBoard = () => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const LoginDetails = useSelector((state) => state.flight.loginDetails);
  const BookingDetails = useSelector((state) => state.flight.BookingDetails);
  const PaymentData = useSelector((state) => state.flight.LastBooking);
  const lengthUserLength = LoginDetails.length;
  const lengthBookingLength = BookingDetails.length;
  const BookingLength = Object.keys(BookingDetails).length;
  const PaymentDataLength = Object.keys(PaymentData).length;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linksData = [
    {
      to: "/profile",
      icon: <CgProfile />,
      text: "Profile",
      color: "red",
    },
    {
      to: "/bookingtable",
      icon: <InventoryIcon />,
      text: "Booking Details",
      color: "green",
    },
    {
      to: "/paymenttable",
      icon: <ThumbUpAltIcon />,
      text: "Confirm Booking",
      color: "black",
    },
    {
      to: "/usertable",
      icon: <IoIosSpeedometer />,
      text: "All User",
      color: "yellow",
    },
    {
      icon: <RiLogoutCircleRFill />,
      text: "Logout",
      color: "purple",
    },
  ];

  const boxesData = [
    {
      to: "/bookingtable",
      icon: <ShoppingCartIcon />,
      text: "Total Booking",
      value: BookingLength,
    },
    {
      to: "/usertable",
      icon: <AdminPanelSettingsIcon />,
      text: "User Login",
      value: lengthUserLength,
    },
    {
      to: "/paymenttable",
      icon: <ConnectingAirportsIcon />,
      text: "Total Travel",
      value: PaymentDataLength,
    },
  ];

  return (
    <>
      <div className="main-section">
        <div className="Dashboard">
          <div
            className={`sidebar pt-20 bg-white ${sidebarVisible ? "w-0" : "w-1/4"}`}
          >
            <div className="profile border-b-2 mx-auto d-flex justify-start pl-10 pb-7">
              <div className="profile-image d-flex pt-8">
                <img
                  src={UserImage}
                  alt="User Image"
                  className="rounded-full"
                />
                <div className="user_details d-flex flex-col pl-3 w-full">
                  <b className="w-full">Navneet Sondarva</b>
                  <span>9687726421</span>
                </div>
              </div>
            </div>
            <div className="links d-flex flex-col pt-16">
              {linksData.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`d-flex justify-start items-center w-72 border-1 p-2 rounded-md shadow-md transition-all link_hover ${
                    activeLink === link.to ? "active-link" : ""
                  }`}
                  onClick={(e) => {
                    if (link.text === "Logout") {
                      e.preventDefault();
                      handleLogout();
                    }
                  }}
                >
                  <div
                    className="link-icon text-lg text-blue-500"
                    style={{ color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div className="link-text pl-4 text-md text-black font-medium">
                    {link.text}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`main-dashboard ${sidebarVisible? "w-4/5" : "w-full"}`}
          >
            <header className="border-y-2 flex justify-between px-4 pb-2 z-10 relative">
              <div className="logo flex justify-center items-center">
                <div className="logo-image w-14 text-red-400 bg-transparent">
                  <img
                    src={MyLogo}
                    alt="Logo of Flight"
                    className="text-black"
                  />
                </div>
                <div className="logo-text font-bold text-white text-2xl pl-2 ">
                  SkySicker
                </div>
              </div>
              <div className="user flex justify-center items-center gap-3.5">
                <button
                  className="bars-logo text-lg text-white border-1 border-white p-2.5 cursor-pointer rounded-md border-opacity-10 bg-change bg-opacity-10 bg-white"
                  onClick={toggleSidebar}
                >
                  <FaBars />
                </button>
                <Link to="/profile">
                  <div className="bars-logo text-lg text-white border-1 border-white p-2.5 cursor-pointer bg-change bg-opacity-10 bg-white rounded-md border-opacity-10">
                    <FaUser />
                  </div>
                </Link>
              </div>
            </header>
            <div className="dashboard-content">
              <div className="heading d-flex justify-between md:flex-row">
                <div className="_text">
                  <h1 className="text-3xl font-bold text-white text-center pt-14 md:pb-2">
                    Hi, Navneet! Welcome Back!
                  </h1>
                </div>
              </div>
              <div className="boxes d-flex gap-5">
                {boxesData.map((box, index) => (
                  <Link
                    key={index}
                    to={box.to}
                    className="box-1 main-box d-flex shadow-md shadow-black rounded-md p-2 bg-white"
                  >
                    <div className="icon text-white bg-opacity-80 border-blue-900 m-3 rounded-md bg-blue-900">
                      {box.icon}
                    </div>
                    <div className="icon d-flex flex-col">
                      <span className="text-lg justify-start">{box.text}</span>
                      <span className="text-2xl text-black font-bold text-left">
                        {box.value}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="all-components pt-28">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;