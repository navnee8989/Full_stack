const axios = require("axios");

// Function to initiate a payment
const FetchData = async (paymentData) => {
  try {
    const response = await axios.post(
      "https://payment.finanvo.in/initiate",
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1zEmcFLBqm",
          "x-api-secret-key": "CxjORJWRkM4b24ZhX1z97NA4a3p3tTxJuvP0sYKJ",
          "app-origin": "http://localhost:2000",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error while making payment request: " + error.message);
  }
};

// Function to check the status of the last booking
const LastBookingAPIBeckend = async (accessKey) => {
  try {
    const response = await axios.get(
      `https://payment.finanvo.in/payment/check/status?accessKey=${accessKey}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1zEmcFLBqm",
          "x-api-secret-key": "CxjORJWRkM4b24ZhX1z97NA4a3p3tTxJuvP0sYKJ",
        },
      }
    );

    if (response.status === 200) {
      return { accessKey, data: response.data.data };
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error While Fetching Data", error);
    throw new Error(error.message || "Failed to fetch data");
  }
};




const BookTicket = async (paymentData) => {
  try {
    const response = await axios.post(
      "https://payment.finanvo.in/initiate",
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1zEmcFLBqm",
          "x-api-secret-key": "CxjORJWRkM4b24ZhX1z97NA4a3p3tTxJuvP0sYKJ",
          "app-origin": "http://localhost:2000",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error while making payment request: " + error.message);
  }
};
// Exporting the functions
module.exports = { FetchData, LastBookingAPIBeckend ,BookTicket};
