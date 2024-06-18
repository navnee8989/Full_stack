import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const FetchAPI = createAsyncThunk(
  "flight/fetchFlightData",
  async (_, { rejectWithValue }) => {
    try {
      const data = "";

      const response = await axios.get("/sectors", data, {
        headers: {
          "api-key":
            "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
          Authorization: `${localStorage.getItem("token")}`,
          withCredentials: true,
        },
      });

      if (!response.data && response.data.data) {
        toast.success("API Calling");
        rejectWithValue("Data are Not come in Sector API");
      } else {
        return response.data.data;
      }
    } catch (error) {
      toast.error("API Calling");

      console.log("Error While Fatching Data");
      rejectWithValue(error.message);
    }
  }
);


