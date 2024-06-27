// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const FetchAPI = createAsyncThunk(
//   "flight/fetchFlightData",
//   async (bookingId) => {
//     try {
//       const response = await axios.get(
//         `/ticket?booking_id=${bookingId}`,
//         {
//           headers: {
//             "api-key":
//               "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
//             Authorization: `${localStorage.getItem("token")}`,
//             withCredentials: true,
//           },
//         }
//       );

//       if (response.status) {
//         return response.data;
//       }
//     } catch (error) {
//       console.log("Error While Fatching Data");
//     }
//   }
// );
