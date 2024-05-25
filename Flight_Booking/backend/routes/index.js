const express = require('express');
const router = express.Router();
const { flightSearch } = require("../controllers/Flight_search");

router.post('/flight_search', flightSearch);

module.exports = router;
