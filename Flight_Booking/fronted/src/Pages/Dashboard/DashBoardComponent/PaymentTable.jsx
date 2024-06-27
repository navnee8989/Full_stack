import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBookingDetails } from "../../../redux/features/flightSlice";

const PaymentTable = () => {
  const PaymentDetails = useSelector((state) => state.flight.LastBooking);
  const dispatch = useDispatch();

  const Data = useMemo(() => Object.entries(PaymentDetails), [PaymentDetails]);

  if (!PaymentDetails || Object.keys(PaymentDetails).length === 0) {
    return <p>Loading...</p>; // Handle loading state if data is not yet available
  }

  const handleDelete = (bookingId) => {
    dispatch(deleteBookingDetails(bookingId));
  };

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-red-500 text-white">
          <tr>
          <th className="py-3 pl-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Payment Status
            </th>
            <th className="py-3 pl-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Full Name
            </th>
            <th className="py-3 pl-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Booking Amount
            </th>
            <th className="py-3 pl-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Email
            </th>
            <th className="py-3 pl-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Mobile
            </th>
            <th className="py-3 pl-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Order Date
            </th>
            <th className="py-3 pl-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Order ID
            </th>
            {/* <th className="py-3 pl-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Payment ID
            </th> */}
           
            <th className="py-3 pl-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Data.map(([bookingId, details]) => (
            <tr key={bookingId}>
            <td
                className={`px-6 py-4 text-center whitespace-nowrap text-sm font-medium `}
              >
                <div
                  className={` p-2 rounded-lg   ${ 
                    details.payment_status === "paid"
                      ? "bg-green-200 text-green-500"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {details.payment_status}
                </div>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                {details.full_name}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                ${details.amount}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                {details.email}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                {details.mobile}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                {new Date(details.order_date).toLocaleDateString()} <br />
                {new Date(details.order_date).toLocaleTimeString()}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                {details.order_id}
              </td>
              {/* <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                {details.payment_id}
              </td> */}
             
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                <button
                  className="text-white rounded-lg font-medium hover:bg-black hover:text-white bg-red-700 p-2 w-36 hover:text-white transition-all"
                  onClick={() => handleDelete(bookingId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
