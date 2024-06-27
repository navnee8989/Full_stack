const axios = require("axios");
const { FetchData } = require("../helpers/FetchData");
const { SavePaymentData } = require("../model/BookingModel");

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

    // Fetch payment data
    const responseData = await FetchData(req.body);
    if (!responseData || !responseData.accesskey) {
      throw new Error("Failed to fetch payment data or access key is missing");
    }

    // Extract access key from response data
    const { accesskey } = responseData;

    // Config for checking payment status
    const configTicket = {
      method: "get",
      url: `https://payment.finanvo.in/payment/check/status?accessKey=${accesskey}`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "1zEmcFLBqm",
        "x-api-secret-key": "CxjORJWRkM4b24ZhX1z97NA4a3p3tTxJuvP0sYKJ",
      },
    };

    // Make API request to get ticket data
    const ticketResponse = await axios.request(configTicket);
    const ticketData = ticketResponse.data.data;
    console.log("TicketData", ticketData);

    // Convert order_date to MySQL DATETIME format
    const formattedOrderDate = new Date(ticketData.order_date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const uploadData = {
      payment_id: ticketData.payment_id,
      full_name: ticketData.full_name,
      email: ticketData.email,
      mobile: ticketData.mobile,
      amount: ticketData.amount,
      description: ticketData.description,
      order_id: ticketData.order_id,
      order_date: formattedOrderDate,
      payment_status: ticketData.payment_status,
    };

    // Save payment data and send response accordingly
    SavePaymentData(uploadData, (err, result) => {
      if (err) {
        console.error("Error While Storing Data", err);
        return res.status(500).send({
          success: false,
          message: "Error While Storing Data",
        });
      }
      console.log("Error While Saving Data oF payement");
    });
  } catch (error) {
    console.error("Error While Storing Data in PaymentDatabase", error);
    if (!res.headersSent) {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
    next(error);
  }
};

module.exports = {
  initiatePayment,
};
