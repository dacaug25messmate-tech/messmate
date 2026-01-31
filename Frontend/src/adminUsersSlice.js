import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admin_url } from "./components/rest_endpoints";

/* API CALL USING FETCH */
export const fetchAllUsers = createAsyncThunk(
  "adminUsers/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(admin_url+"/viewusers");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default adminUsersSlice.reducer;
