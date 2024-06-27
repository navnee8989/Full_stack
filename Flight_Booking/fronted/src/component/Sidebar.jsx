import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosSpeedometer } from "react-icons/io";
import InventoryIcon from "@mui/icons-material/Inventory";
import { RiLogoutCircleRFill } from "react-icons/ri";
import UserImage from '../assets/20231016234504_IMG_8528.JPG' 

const Sidebar = () => {
  
  return (
    <div className={`sidebar bg-white ${activeLink === "/logout"? "hidden" : ""}`}>
      <div className="profile border-b-2 mx-auto d-flex justify-start pl-10 pb-7">
        <div className="profile-image d-flex pt-8">
          <img src={UserImage} alt="User Image" className="rounded-full" />
          <div className="user_details d-flex flex-col pl-3 w-full">
            <b className="w-full">Navneet Sondarva</b>
            <span>9687726421</span>
          </div>
        </div>
      </div>
      <div className="links d-flex flex-col pt-16">
        <Link
          to="/dashboard"
          className={`d-flex justify-start items-center w-72 border-1 p-2 rounded-md shadow-md transition-all link_hover ${
            activeLink === "/dashboard"? "active-link" : ""
          }`}
          onClick={() => setActiveLink("/dashboard")}
        >
          <div className="link-icon text-2xl text-blue-500">
            <IoIosSpeedometer />
          </div>
          <div className="link-text pl-4 text-md text-black font-medium">
            Dashboard
          </div>
        </Link>
        <Link
          to="/profile"
          className={`d-flex justify-start items-center w-72 border-1 p-2 rounded-md shadow-sm transition-all link_hover ${
            activeLink === "/profile"? "active-link" : ""
          }`}
          onClick={() => setActiveLink("/profile")}
        >
          <div className="link-icon text-lg text-red-500">
            <CgProfile />
          </div>
          <div className="link-text pl-4 text-md text-black font-medium">
            Profile
          </div>
        </Link>
        <Link
          to="/bookingtable"
          className={`d-flex justify-start items-center w-72 border-1 p-2 rounded-md shadow-sm transition-all link_hover ${
            activeLink === "/booking-details"? "active-link" : ""
          }`}
          onClick={() => setActiveLink("/booking-details")}
        >
          <div className="link-icon text-lg text-green-500">
            <InventoryIcon />
          </div>
          <div className="link-text pl-4 text-md text-black font-medium">
            Booking Details
          </div>
        </Link>
        <Link
          to="/usertable"
          className={`d-flex justify-start items-center w-72 border-1 p-2 rounded-md shadow-sm transition-all link_hover ${
            activeLink === "/all-user"? "active-link" : ""
          }`}
          onClick={() => setActiveLink("/all-user")}
        >
          <div className="link-icon text-lg text-yellow-500">
            <IoIosSpeedometer />
          </div>
          <div className="link-text pl-4 text-md text-black font-medium">
            All User
          </div>
        </Link>
        <button
          className={`d-flex justify-start items-center w-72 border-1 p-2 rounded-md shadow-sm transition-all link_hover ${
            activeLink === "/logout"? "active-link" : ""
          }`}
          onClick={() => {
            setActiveLink("/logout");
            handleLogout();
          }}
        >
          <div className="link-icon text-lg text-pink-500">
            <RiLogoutCircleRFill />
          </div>
          <div className="link-text pl-4 text-md text-black font-medium">
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;