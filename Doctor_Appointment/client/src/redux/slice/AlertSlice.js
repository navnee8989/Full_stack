import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Loading: false
};

export const alertSlice = createSlice({
    name: "Alert",
    initialState,
    reducers: {
        showLoading: (state) => {
            state.Loading = true;
        },
        hideLoading: (state) => {
            state.Loading = false;
        }
    }
});


export const { showLoading, hideLoading } = alertSlice.actions;
export default alertSlice.reducer;
