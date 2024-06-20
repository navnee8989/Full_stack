import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import flightSlice from "./features/flightSlice";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, flightSlice);

console.log("Store Start");
const store = configureStore({
  reducer: {
    flight: persistedReducer,
  }

});

const persistor = persistStore(store);

export { store, persistor };