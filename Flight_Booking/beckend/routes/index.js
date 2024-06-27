const express = require("express");
const {
  initiatePayment,
} = require("../controllers/paymntControllers");
const { BookTicket } = require("../controllers/BookingDetails");
const router = express.Router();

router.post("/initiate", initiatePayment);
router.post("/ticket_details", BookTicket);
// router.post("/payment_details", PaymentDetials);


module.exports = router;
