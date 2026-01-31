import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admin_url } from "./components/rest_endpoints";

export const fetchAllFeedback = createAsyncThunk(
  "adminFeedback/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(admin_url+"/feedback");

      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminFeedbackSlice = createSlice({
  name: "adminFeedback",
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchAllFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminFeedbackSlice.reducer;
