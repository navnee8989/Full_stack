// controllers/paymentController.js

const { FetchData } = require("../helpers/FetchData");

// Handle POST request to initiate payment
const initiatePayment = async (req, res, next) => {
  try {
    const {
      domain,
      full_name,
      mobile,
      email,
      amount,
      description,
      callback_url,
      order_date,
      order_id,
    } = req.body;

    const responseData = await FetchData(req.body);
    res.status(200).json(responseData);
  } catch (error) {
    next(error); // Pass error to the next middleware (error handler)
  }
};

module.exports = {
  initiatePayment,
};
