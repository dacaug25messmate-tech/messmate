import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:2025/api/admin";

/* ================= FETCH ================= */
export const fetchFoodRequests = createAsyncThunk(
  "foodRequests/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/food-requests`);

      if (!res.ok) {
        throw new Error("Failed to fetch food requests");
      }

      const data = await res.json();

      // Ensure always an array
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.data)) return data.data;

      return [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ================= APPROVE ================= */
export const approveFoodRequest = createAsyncThunk(
  "foodRequests/approve",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/food-requests/approve/${id}`,
        { method: "PUT" }
      );

      if (!res.ok) {
        throw new Error("Approve failed");
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ================= REJECT ================= */
export const rejectFoodRequest = createAsyncThunk(
  "foodRequests/reject",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/food-requests/reject/${id}`,
        { method: "PUT" }
      );

      if (!res.ok) {
        throw new Error("Reject failed");
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ================= SLICE ================= */
const foodItemRequestsSlice = createSlice({
  name: "foodRequests",
  initialState: {
    requests: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchFoodRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchFoodRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.requests = [];
      })

      /* APPROVE */
      .addCase(approveFoodRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter(
          (r) => r.requestId !== action.payload
        );
      })

      /* REJECT */
      .addCase(rejectFoodRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter(
          (r) => r.requestId !== action.payload
        );
      });
  }
});

export default foodItemRequestsSlice.reducer;
