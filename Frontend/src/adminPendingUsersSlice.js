import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:2025/api/admin";

// 🔹 Fetch pending users
export const fetchPendingUsers = createAsyncThunk(
  "adminPendingUsers/fetchPendingUsers",
  async () => {
    const response = await fetch(`${BASE_URL}/pendingusers`);

    if (!response.ok) {
      throw new Error("Failed to fetch pending users");
    }

    return await response.json();
  }
);

// 🔹 Approve user
export const approveUser = createAsyncThunk(
  "adminPendingUsers/approveUser",
  async (id, { dispatch }) => {
    const response = await fetch(`${BASE_URL}/approve/${id}`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error("Failed to approve user");
    }

    dispatch(fetchPendingUsers());
  }
);

//  Reject user
export const rejectUser = createAsyncThunk(
  "adminPendingUsers/rejectUser",
  async (id, { dispatch }) => {
    const response = await fetch(`${BASE_URL}/reject/${id}`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error("Failed to reject user");
    }

    dispatch(fetchPendingUsers());
  }
);

const adminPendingUsersSlice = createSlice({
  name: "adminPendingUsers",
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchPendingUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default adminPendingUsersSlice.reducer;
