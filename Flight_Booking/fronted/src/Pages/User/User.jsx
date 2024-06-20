import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";

const User = () => {
  const userDetails = useSelector((state) => state.flight.loginDetails);
  const [mainUser, setMainUser] = useState([]);

  useEffect(() => {
    if (userDetails.length === 0) {
      toast.error("Error while getting data from the Redux store");
    } else {
      const users = userDetails.map(item => ({
        ...item.user,
        loginDate: item.loginDate,
        loginTime: item.loginTime
      }));
      
      if (users.length === 0) {
        toast.error("No users found");
      } else {
        setMainUser(users);
      }
    }
  }, [userDetails]);

  return (
    <div className="pt-12 w-full mx-auto container-fluid">
      <h1 className="text-center">User Details</h1>
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email ID</th>
              <th>Mobile Number</th>
              <th>Agency ID</th>
              <th>Agency Name</th>
              <th>Balance</th>
              <th>City</th>
              <th>Contact Person</th>
              <th>Country</th>
              <th>Login Date</th>
              <th>Login Time</th>
            </tr>
          </thead>
          <tbody>
            {mainUser.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  <Loader />
                </td>
              </tr>
            ) : (
              mainUser.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.email_id}</td>
                  <td>{user.mobile_no}</td>
                  <td>{user.agency_id}</td>
                  <td>{user.agency_name}</td>
                  <td>{user.balance}</td>
                  <td>{user.city}</td>
                  <td>{user.contact_person}</td>
                  <td>{user.country}</td>
                  <td>{user.loginDate}</td>
                  <td>{user.loginTime}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
