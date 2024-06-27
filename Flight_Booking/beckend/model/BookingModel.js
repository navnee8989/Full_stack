const pool = require("../utils/pool");

function saveBooking(data, callback) {
  const sql = `INSERT INTO lasttciketdata 
                (agency_name, booking_id, booking_date, sector, pnr, airline, flight_no, departure_date, departure_time, arrival_date, arrival_time, total_amount, passengerType, passenger_names) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.agency_name,
    data.booking_id,
    data.booking_date,
    data.sector,
    data.pnr,
    data.airline,
    data.flight_no,
    data.departure_date,
    data.departure_time,
    data.arrival_date,
    data.arrival_time,
    data.total_amount,
    data.passengerType,
    data.passenger_names,
  ];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving booking:", err);
      return callback(err);
    }
    console.log("Booking saved successfully");
    callback(null, result);
  });
}

function SavePaymentData(data, callback) {
  const sql = `INSERT INTO payments 
                (payment_id, full_name, email, mobile, amount, description, order_id, order_date, payment_status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.payment_id,
    data.full_name,
    data.email,
    data.mobile,
    data.amount,
    data.description,
    data.order_id,
    data.order_date,
    data.payment_status,
  ];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving booking:", err);
      return callback(err);
    }
    console.log("Booking saved successfully");
    callback(null, result);
  });
}

module.exports = { saveBooking, SavePaymentData };
