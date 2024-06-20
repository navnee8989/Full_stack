import axios from "axios";

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

export default  FetchData ;
