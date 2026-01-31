import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { messowner_url } from "./components/rest_endpoints";

export const submitFoodRequest = createAsyncThunk(
  "messOwnerRequests/submit",
  async (requestData, { rejectWithValue }) => {
    try {
      console.log(requestData);
      const res = await fetch(
        messowner_url+"/food-requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
  foodName: requestData.itemName, 
  description: requestData.description,
  subCategoryId: Number(requestData.subCategoryId), 
  userId: Number(requestData.userId), 
}),

        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        return rejectWithValue(errorText || "Failed to submit request");
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const messOwnerFoodRequestSlice = createSlice({
  name: "messOwnerRequests",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFoodRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitFoodRequest.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitFoodRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = messOwnerFoodRequestSlice.actions;
export default messOwnerFoodRequestSlice.reducer;
