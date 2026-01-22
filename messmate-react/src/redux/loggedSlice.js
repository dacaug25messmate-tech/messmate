import { createSlice } from "@reduxjs/toolkit";

// slice - part of store
const loggedSlice = createSlice({
  name: "logged",
  initialState: {
    loggedIn: false,
    role: ""
  },
  reducers: {
    login: (state, action) => {
      return {
        loggedIn: true,
        role: action.payload
      };
    },
    logout: () => {
      return {
        loggedIn: false,
        role: ""
      };
    }
  }
});

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;
