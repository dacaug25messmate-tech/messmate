import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { messowner_url } from "./components/rest_endpoints";


export const fetchMessOwnerRatings = createAsyncThunk(
  "messOwnerRatings/fetchAll",
  async (messOwnerId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${messowner_url}/messes/ratings/${messOwnerId}`,
        {
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch ratings");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const messOwnerRatingsSlice = createSlice({
  name: "messOwnerRatings",
  initialState: {
    messes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessOwnerRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessOwnerRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.messes = action.payload;
      })
      .addCase(fetchMessOwnerRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messOwnerRatingsSlice.reducer;