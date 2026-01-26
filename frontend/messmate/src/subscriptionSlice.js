import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subscriptionService from "./subscriptionService";

export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetch",
  async (messId, { rejectWithValue }) => {
    try {
      return await subscriptionService.getSubscriptions(messId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;
