const axios = require("axios");
const { saveBooking } = require("../model/BookingModel"); // Adjust the import path as per your project structure

const BookTicket = async (req, res) => {
  try {
    const { bookingId } = req.body;
    console.log("Booking ID:", bookingId);

    // Extract custom headers from request headers
    const apiKey = req.headers["api-key"];
    const authorization = req.headers["authorization"];

    // Example configuration for making an API call to retrieve ticket data
    const configTicket = {
      method: "get",
      url: `https://omairiq.azurewebsites.net/ticket?booking_id=${bookingId}`,
      headers: {
        "api-key": apiKey,
        Authorization: authorization,
      },
    };

    // Make API request to get ticket data
    const ticketResponse = await axios.request(configTicket);
    const ticketData = ticketResponse.data.data;

    // Function to prepare and save booking data for each passenger type
    const savePassengerData = (passengerType, passengers) => {
      passengers.forEach((passenger) => {
        const SaveDB = {
          agency_name: ticketData.agency_name,
          booking_id: ticketData.booking_id,
          booking_date: new Date(ticketData.booking_date),
          sector: ticketData.sector,
          pnr: ticketData.pnr,
          airline: ticketData.airline,
          flight_no: ticketData.flight_no,
          departure_date: new Date(ticketData.departure_date),
          departure_time: ticketData.departure_time,
          arrival_date: new Date(ticketData.arrival_date),
          arrival_time: ticketData.arrival_time,
          total_amount: ticketData.total_amount,
          passengerType,
          passenger_names: passenger.Name,
        };

        // Save booking data to database
        saveBooking(SaveDB, (err, result) => {
          if (err) {
            console.error("Error saving booking:", err);
            return res.status(500).json({ error: "Error saving booking" });
          }
          console.log("Booking saved successfully");
        });
      });
    };

    // Save adult passengers
    if (ticketData.passenger_details.Adult) {
      savePassengerData("Adult", ticketData.passenger_details.Adult);
    }

    // Save child passengers
    if (ticketData.passenger_details.Child) {
      savePassengerData("Child", ticketData.passenger_details.Child);
    }

    // Save infant passengers
    if (ticketData.passenger_details.Infant) {
      savePassengerData("Infant", ticketData.passenger_details.Infant);
    }

    // Send success response
    res.send({
      success: true,
      data: ticketData,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Booking error" });
  }
};

const PaymentDetials = async (req, res) => {
  try {
    const { PaymentID } = req.body;
    console.log("Booking ID:", bookingId);

    // Extract custom headers from request headers

    // Example configuration for making an API call to retrieve ticket data
    const configTicket = {
      method: "get",
      url: `https://payment.finanvo.in/payment/check/status?accessKey=${PaymentID}`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "1zEmcFLBqm",
        "x-api-secret-key": "CxjORJWRkM4b24ZhX1z97NA4a3p3tTxJuvP0sYKJ",
      },
    };

    // Make API request to get ticket data
    const ticketResponse = await axios.request(configTicket);
    const ticketData = ticketResponse.data.data;

    // Send success response
    res.send({
      success: true,
      data: ticketData,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Booking error" });
  }
};
module.exports = { BookTicket, PaymentDetials };
