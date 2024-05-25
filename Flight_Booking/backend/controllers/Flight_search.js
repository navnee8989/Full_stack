const db = require("../models");

const flightSearch = async (req, res) => {
  try {
    const { origin, destination, departureDate, tickets } = req.body;

    const flightSearchData = {
      origin,
      destination,
      departureDate,
      tickets: [
        {
          adults: tickets.adult || 0,
          children: tickets.child || 0,
          infants: tickets.infant || 0,
        },
      ],
    };

    const flightSearch = await db.FlightSearch.create(flightSearchData);

    res.status(201).json({
      success: true,
      message: "Flight search request created successfully",
      data: flightSearch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error creating flight search request",
    });
  }
};

module.exports = { flightSearch };