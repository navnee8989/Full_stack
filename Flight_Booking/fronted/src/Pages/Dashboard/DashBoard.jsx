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

  const userDetails = useSelector((state) => state.flight.loginDetails);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleRedirect = ()=>{
    navigate("/user")
  }
  return (
    <>
      <div className="  d-flex bg-amber-100">
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
        <div className="View m-0 p-0 ">
          <div className="navbar bg-blue-200">
            <Navbar />
          </div>

          <div className="boxes pt-12 w-75 mx-auto d-flex gap-10">
            <div className="shadow-md shrink-0 h-46 w-64    bg-blue-200 rounded-xl" onClick={handleRedirect}>
              <div className="countUser text-2xl  p-2 rounded-s-md">{userDetails.length}</div>
              <div className="userName">

              </div>
            </div>
            <div className="shadow-md shrink-0 h-46 w-64 p-4  text-8xl d-flex justify-center items-center">
              2
            </div>
            <div className="shadow-md shrink-0 h-46 w-64 p-4  text-8xl d-flex justify-center items-center">
              2
            </div>
            <div className="shadow-md shrink-0 h-46 w-64 p-4  text-8xl d-flex justify-center items-center">
              2
            </div>
          </div>
          <div className="veiw_data w-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
