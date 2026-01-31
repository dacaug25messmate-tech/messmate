import { createSlice } from "@reduxjs/toolkit";

export const loggedSlice = createSlice({
  name: "logged",
  initialState: {
    loggedIn: false,
    role: "",
    username: "",
    userid: null
  },

  reducers: {
    login: (state, action) => {
      const { role, username, userid } = action.payload;
      state.loggedIn = true;
      state.role = role;
      state.username = username;
      state.userid = userid;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.role = "";
      state.username = "";
      state.userid = null;
    }
  }
});

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;
