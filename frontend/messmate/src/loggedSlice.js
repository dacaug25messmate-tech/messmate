import { createSlice } from "@reduxjs/toolkit";

export const loggedSlice = createSlice({
  name: "logged",
  initialState: {
    loggedIn: false,
    role: "",
    username: "",
    userid: null, // store user ID
    messId: null  // store messId if logged in user is a Mess Owner
  },
  reducers: {
    login: (state, action) => {
      const { role, uname, uid, messId } = action.payload;
      state.loggedIn = true;
      state.role = role;
      state.username = uname;
      state.userid = uid;
      state.messId = messId || null;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.role = "";
      state.username = "";
      state.userid = null;
      state.messId = null;
    }
  }
});

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;
