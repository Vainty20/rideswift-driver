import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import reportsReducer from "./reports/reportsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reports: reportsReducer,
  },
});

export default store;
