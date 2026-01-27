import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all subcategories from backend
export const fetchSubCategories = createAsyncThunk(
  "subCategories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:2025/api/subcategories");
      if (!res.ok) throw new Error("Failed to fetch subcategories");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState: {
    subCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subCategoriesSlice.reducer;
