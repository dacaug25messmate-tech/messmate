import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./redux/loggedSlice";

export const store = configureStore({
  reducer: {
    logged: loggedReducer
  }
});

export default store;
