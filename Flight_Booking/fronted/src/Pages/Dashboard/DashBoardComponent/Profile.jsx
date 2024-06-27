import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const LoginData = useSelector((state) => state.flight.loginDetails);

  // Ensure LoginData is not empty and get the latest login entry
  const latestLogin = LoginData.length > 0 ? LoginData[LoginData.length - 1] : null;

  if (!latestLogin) {
    return <p>Loading...</p>; // Handle loading state if LoginData is empty or not yet available
  }

  return (
    <div className="profile-page mt-24">
      <h1 className="text-white font-semibold text-4xl ml-10">My Profile</h1>
      <div className="Profile rounded-lg pt-10">
        {/* Display Latest Login Details */}
        <div className="mt-8 bg-white p-8 rounded-lg border-1 border-blue-700">
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <div className="grid grid-cols-2 gap-4">
            
            <div className="flex flex-col">
              <span className="font-bold">Login Time:</span>
              <span>{latestLogin.loginTime}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Agency Name:</span>
              <span>{latestLogin.user.agency_name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Contact Person:</span>
              <span>{latestLogin.user.contact_person}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Email:</span>
              <span>{latestLogin.user.email_id}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Mobile:</span>
              <span>{latestLogin.user.mobile_no}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
