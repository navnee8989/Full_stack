import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginDetails: [],
  allData: null,
  allFlightData: [],
  adultCountData: 1,
  childCountData: 0,
  infantCountData: 0,
  departureDateNew: null,
  getTicketInfo: null,
  status: "idle",
  Laoding: false,
  error: null,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      state.loginDetails.push({...action.payload})
    },
    setallData(state, action) {
      state.allData = action.payload;
    },
    setgetTicketInfo(state, action) {
      state.getTicketInfo = action.payload;
    },
    setallFlightData(state, action) {
      state.allFlightData = action.payload;
    },
    setadultCountData(state, action) {
      state.adultCountData = action.payload;
    },

    setchildCountData(state, action) {
      state.childCountData = action.payload;
    },
    setinfantCountData(state, action) {
      state.infantCountData = action.payload;
    },
    setdepartureDateNew(state, action) {
      state.departureDateNew = action.payload;
    },
  },
});

export const {
  setallData,
  setallFlightData,
  setadultCountData,
  setchildCountData,
  setinfantCountData,
  setdepartureDateNew,
  setLoginDetails,
  setgetTicketInfo,
} = flightSlice.actions;

export default flightSlice.reducer;
