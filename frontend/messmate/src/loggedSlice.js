import { createSlice } from "@reduxjs/toolkit";

export const loggedSlice = createSlice({
  name: "logged",
  initialState: {
    loggedIn: false,
    role: "",
    username: ""
  },
  reducers: {
    login: (state, action) => {
      const { role, username } = action.payload;
      state.loggedIn = true;
      state.role = role;
      state.username = username;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.role = "";
      state.username = "";
    }
  }
});

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;
