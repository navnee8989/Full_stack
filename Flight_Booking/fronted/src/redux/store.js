import { configureStore } from "@reduxjs/toolkit";
import flightSlice from "./features/flightSlice";


console.log("Store Start");
const store = configureStore({
  reducer: {
    flight: flightSlice,
  },
});

export default store;
