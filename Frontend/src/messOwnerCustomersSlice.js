import { createSlice } from "@reduxjs/toolkit";

/* ============================
   SLICE
============================ */
const messOwnerCustomersSlice = createSlice({
  name: "messOwnerCustomers",
  initialState: {
    messes: [],
    customers: [],
    activeMessId: null,
    loading: false,
    error: null,
  },
  reducers: {
    // MESS FETCH
    fetchMessesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMessesSuccess: (state, action) => {
      state.loading = false;
      state.messes = action.payload;
      state.activeMessId = action.payload.length > 0 ? action.payload[0].messId : null;
    },
    fetchMessesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // CUSTOMERS FETCH
    fetchCustomersStart: (state) => {
      state.loading = true;
      state.error = null;
      state.customers = [];
    },
    fetchCustomersSuccess: (state, action) => {
      state.loading = false;
      state.customers = action.payload;
    },
    fetchCustomersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // SET ACTIVE MESS
    setActiveMess: (state, action) => {
      state.activeMessId = action.payload;
      state.customers = [];
    },
  },
});

/* ============================
   ASYNC ACTIONS
============================ */

// Fetch messes for the logged-in owner
export const fetchOwnerMesses = (userId) => async (dispatch) => {
  try {
    dispatch(fetchMessesStart());
    const res = await fetch(`http://localhost:2025/api/messowner/messes/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch messes");
    const data = await res.json();
    dispatch(fetchMessesSuccess(data));
  } catch (err) {
    dispatch(fetchMessesFailure(err.message));
  }
};

// Fetch customers for a specific mess
export const fetchRegisteredCustomers = (messId) => async (dispatch) => {
  if (!messId) return;
  try {
    dispatch(fetchCustomersStart());
    const res = await fetch(`http://localhost:2025/api/messowner/customers/${messId}`);
    if (!res.ok) throw new Error("Failed to fetch customers");
    const data = await res.json();
    dispatch(fetchCustomersSuccess(data));
  } catch (err) {
    dispatch(fetchCustomersFailure(err.message));
  }
};

/* ============================
   EXPORTS
============================ */
export const {
  fetchMessesStart,
  fetchMessesSuccess,
  fetchMessesFailure,
  fetchCustomersStart,
  fetchCustomersSuccess,
  fetchCustomersFailure,
  setActiveMess,
} = messOwnerCustomersSlice.actions;

export default messOwnerCustomersSlice.reducer;
