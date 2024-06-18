import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./dashaboard.css";
import Navbar from "../../component/Navbar";
import UserImage from "../../assets/user-avatar_12188066.png";
import { FaHome, FaUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { useSelector } from "react-redux";
import Loader from "../../component/Loader";

const DashBoard = ({ state }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {};

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="d-container  d-flex ">
        <div className="wrepper">
          <div className="sidebar  bg-blue-200 ">
            <div className="user d-flex flex-col cursor-pointer">
              <img src={UserImage} alt="User Icons" className="" />
              <span className="pt-3 uppercase font-semibold font-monospace">
                {user.mobile_no}
              </span>
            </div>

            <div className="Links">
              <div className="nav-link">
                <Link
                  to="/booking"
                  className="d-flex justify-between px-4 items-center"
                >
                  <div>
                    <TbBrandBooking className="text-2xl" />
                  </div>
                  <span>booking</span>
                </Link>
              </div>
              <div className="nav-link">
                <Link
                  to="/user"
                  className="d-flex justify-between px-4 items-center"
                >
                  <div>
                    <FaUser className="text-2xl" />
                  </div>
                  <span>User</span>
                </Link>
              </div>
            </div>
            <div className="logout ">
              <button type="button" onClick={handleLogout}>
                logout
              </button>
            </div>
          </div>
        </div>
        <div className="View    ">
          <div className="navbar w-full pt-3 pb-8 bg-blue-200">
            <Navbar />
          </div>

          <div className="veiw_data w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
