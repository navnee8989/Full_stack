import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slice/AlertSlice";


const store =  configureStore({
 reducer:{
    Alert: alertSlice
 }
});

export default store