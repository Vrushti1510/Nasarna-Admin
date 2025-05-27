// src/Redux/store.jsx

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import trusteeReducer from "./trusteeSlice";
import donorReducer from "./donorSlice";
import donationReducer from "./donationSlice";
import causeReducer from "./causeSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    trustees: trusteeReducer,
    donors: donorReducer,
    donations: donationReducer,
    causes: causeReducer,
  },
});

export default store;
