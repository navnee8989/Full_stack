import axios from "axios";

// Function to fetch data
export const FetchData = async (paymentData) => {
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

export const FetchTicket = async (bookingId) => {
  try {
    
    const token = localStorage.getItem("token");


    // console.log("Token From Helpers",token);
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `/api/ticket?booking_id=${bookingId}`,
      headers: {
        "api-key":
          "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
        Authorization: `${token}`, 
        "Content-Type": "application/json",
      },
      data: "",
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching ticket data: " + error.message);
  }
};
