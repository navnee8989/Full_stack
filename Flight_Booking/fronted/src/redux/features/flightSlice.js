import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk action for fetching flight data by booking ID
export const FetchAPI = createAsyncThunk(
  "flight/fetchFlightData",
  async (bookingId) => {
    try {
      const response = await axios.get(`/api/ticket?booking_id=${bookingId}`, {
        headers: {
          "api-key":
            "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0=",
          Authorization: `${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        return { bookingId, data: response.data.data };
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error While Fetching Data", error);
      throw error;
    }
  }
);

export const LastBookingAPI = createAsyncThunk(
  "flight/fetchLastBookingData",
  async (accessKey) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/ticket-details",
        { accessKey },
        {
          headers: {
            "Content-Type": "application/json",
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
      throw error;
    }
  }
);

const initialState = {
  loginDetails: [],
  allData: null,
  allFlightData: [],
  adultCountData: 1,
  childCountData: 0,
  infantCountData: 0,
  departureDateNew: null,
  BookingDetails: {},
  LastBooking: {},
  AccessKey: [],
  getTicketInfo: null,
  status: "idle",
  loading: false,
  error: null,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      state.loginDetails.push({ ...action.payload });
    },
    setallData: (state, action) => {
      state.allData = action.payload;
    },
    setAccessKey: (state, action) => {
      state.AccessKey.push({ ...action.payload });
    },
    setBookingDetails: (state, action) => {
      const { bookingId, data } = action.payload;
      state.BookingDetails[bookingId] = {
        ...state.BookingDetails[bookingId],
        ...data,
      };
    },
    clearBookingData: (state) => {
      state.LastBooking = {};
    },
    deleteBookingDetails: (state, action) => {
      const bookingId = action.payload;
      delete state.LastBooking[bookingId];
    },
    setgetTicketInfo: (state, action) => {
      state.getTicketInfo = action.payload;
    },
    setallFlightData: (state, action) => {
      state.allFlightData = action.payload;
    },
    setadultCountData: (state, action) => {
      state.adultCountData = action.payload;
    },
    setchildCountData: (state, action) => {
      state.childCountData = action.payload;
    },
    setinfantCountData: (state, action) => {
      state.infantCountData = action.payload;
    },
    setdepartureDateNew: (state, action) => {
      state.departureDateNew = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchAPI.fulfilled, (state, action) => {
        const { bookingId, data } = action.payload;
        state.loading = false;
        state.error = null;
        state.BookingDetails[bookingId] = {
          ...state.BookingDetails[bookingId],
          ...data,
        };
      })
      .addCase(FetchAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(LastBookingAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LastBookingAPI.fulfilled, (state, action) => {
        const { accessKey, data } = action.payload;
        state.loading = false;
        state.error = null;
        state.LastBooking[accessKey] = data;
      })
      .addCase(LastBookingAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch data";
      });
  },
});

export const {
  setLoginDetails,
  setallData,
  setAccessKey,
  setBookingDetails,
  setgetTicketInfo,
  setallFlightData,
  setadultCountData,
  clearBookingData,
  setchildCountData,
  setinfantCountData,
  deleteBookingDetails,
  setdepartureDateNew,
} = flightSlice.actions;

export default flightSlice.reducer;
