import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearBookingData } from '../../../redux/features/flightSlice';

const BookingTable = () => {
  const bookingDetails = useSelector(state => state.flight.BookingDetails);

  const dispatch = useDispatch()
  if (!bookingDetails || Object.keys(bookingDetails).length === 0) {
    return <p>Loading...</p>; // Handle loading state if data is not yet available
  }


  // const handleRemove = ()=>{
  //   dispatch(clearBookingData())
  // onClick={handleRemove}
  // }
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    {/* <div className="btn btn-daneger" >
      Remove Data
    </div> */}
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booking ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Full Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booking Amount
            </th>
            
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arrivel Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Flight No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sector
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.keys(bookingDetails).map(key => {
            const booking = bookingDetails[key];
            const passengerName = booking.passenger_details.Adult[0]?.Name;
            return (
              <tr key={key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.booking_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {passengerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${booking.total_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                 Date:- {booking.arrival_date} <br/>
                 Time:- {booking.arrival_time} 
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.flight_no}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.sector}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
