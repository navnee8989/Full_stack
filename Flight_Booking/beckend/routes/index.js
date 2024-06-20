const express = require("express");
const {  initiatePayment } = require("../controllers/paymntControllers");
const router = express.Router();

router.post("/initiate", initiatePayment);

module.exports = router;
