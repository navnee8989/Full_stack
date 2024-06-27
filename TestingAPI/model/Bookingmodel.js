const pool = require('../utils/pool');

function saveBooking(data, callback) {
    const sql = `INSERT INTO lasttciketdata 
                (agency_name, booking_id, booking_date, sector, pnr, airline, flight_no, departure_date, departure_time, arrival_date, arrival_time, total_amount, passengerType, passenger_names) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        data.agency_name, data.booking_id, data.booking_date, data.sector, data.pnr, data.airline, data.flight_no,
        data.departure_date, data.departure_time, data.arrival_date, data.arrival_time, data.total_amount,
        data.passengerType, data.passenger_names
    ];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error saving booking:', err);
            return callback(err);
        }
        console.log('Booking saved successfully');
        callback(null, result);
    });
}

module.exports = { saveBooking };
