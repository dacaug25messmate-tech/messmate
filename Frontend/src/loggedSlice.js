import { createSlice } from "@reduxjs/toolkit";

export const loggedSlice = createSlice({
  name: "logged",
  initialState: {
    loggedIn: false,
    role: "",
    username: "",
    userid: null,  
    messId: null   
  },
  
  reducers: {
    login: (state, action) => {
      const { role, username, userid, messId } = action.payload;
      state.loggedIn = true;
      state.role = role;
      state.username = username;
      state.userid = userid;
      state.messId = messId;
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
