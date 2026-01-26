import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFoodRequests = createAsyncThunk(
  "foodRequests/fetch",
  async () => {
    const res = await fetch(
      "http://localhost:2025/api/admin/food-requests"
    );
    return res.json();
  }
);

export const approveFoodRequest = createAsyncThunk(
  "foodRequests/approve",
  async (id) => {
    await fetch(
      `http://localhost:2025/api/admin/food-requests/approve/${id}`,
      { method: "PUT" }
    );
    return id;
  }
);

export const rejectFoodRequest = createAsyncThunk(
  "foodRequests/reject",
  async (id) => {
    await fetch(
      `http://localhost:2025/api/admin/food-requests/reject/${id}`,
      { method: "PUT" }
    );
    return id;
  }
);

const foodItemRequestsSlice = createSlice({
  name: "foodRequests",
  initialState: {
    requests: [],
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoodRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(approveFoodRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter(
          (r) => r.requestId !== action.payload
        );
      })
      .addCase(rejectFoodRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter(
          (r) => r.requestId !== action.payload
        );
      });
  }
});

export default foodItemRequestsSlice.reducer;
