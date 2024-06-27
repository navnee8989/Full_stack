import React from "react";
import { useSelector } from "react-redux";

const UserTable = () => {
  const loginDetails = useSelector((state) => state.flight.loginDetails);

  // console.log(loginDetails);
  return (
    <div className="container mx-auto p-4 w-full">
      <div className="">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">Login Date</th>
              <th className="py-2 px-4">Login Time</th>
              <th className="py-2 px-4">Agency ID</th>
              <th className="py-2 px-4">Agency Name</th>
              <th className="py-2 px-4">Contact Person</th>
              <th className="py-2 px-4">Balance</th>
              <th className="py-2 px-4">City</th>
              <th className="py-2 px-4">Country</th>
              <th className="py-2 px-4">Email ID</th>
              <th className="py-2 px-4">Mobile No</th>
            </tr>
          </thead>
          <tbody>
            {loginDetails.map((login, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{login.loginDate}</td>
                <td className="border px-4 py-2">{login.loginTime}</td>
                <td className="border px-4 py-2">{login.user.agency_id}</td>
                <td className="border px-4 py-2">{login.user.agency_name}</td>
                <td className="border px-4 py-2">
                  {login.user.contact_person}
                </td>
                <td className="border px-4 py-2">{login.user.balance}</td>
                <td className="border px-4 py-2">{login.user.city}</td>
                <td className="border px-4 py-2">
                  {login.user.country ? login.user.country : "N/A"}
                </td>
                <td className="border px-4 py-2">{login.user.email_id}</td>
                <td className="border px-4 py-2">{login.user.mobile_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
