import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRatings = createAsyncThunk(
  "ratings/fetchRatings",
  async (userId) => {
    const response = await fetch(
      `http://localhost:2025/mess-owner/ratings/${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch ratings");
    }

    return await response.json();
  }
);

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: {
    ratings: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ratings = action.payload;
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ratingsSlice.reducer;
