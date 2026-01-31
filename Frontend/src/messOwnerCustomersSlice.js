import { createSlice } from "@reduxjs/toolkit";
import { messowner_url } from "./components/rest_endpoints";

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
    fetchMessesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMessesSuccess: (state, action) => {
      state.loading = false;
      state.messes = action.payload;
      state.activeMessId =
        action.payload.length > 0 ? action.payload[0].messId : null;
    },
    fetchMessesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

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

    setActiveMess: (state, action) => {
      state.activeMessId = action.payload;
      state.customers = [];
    },
  },
});

// ASYNC ACTIONS

export const fetchOwnerMesses = (userId) => async (dispatch) => {
  try {
    dispatch(fetchMessesStart());
    const res = await fetch(
      `${messowner_url}/messes/${userId}`
    );
    if (!res.ok) throw new Error("Failed to fetch messes");
    const data = await res.json();
    dispatch(fetchMessesSuccess(data));
  } catch (err) {
    dispatch(fetchMessesFailure(err.message));
  }
};

export const fetchRegisteredCustomers =
  (messId, date, mealType) => async (dispatch) => {
    if (!messId || !date || !mealType) return;

    try {
      dispatch(fetchCustomersStart());

      const res = await fetch(
        `${messowner_url}/customers/${messId}?date=${date}&mealType=${mealType}`
      );

      if (!res.ok) throw new Error("Failed to fetch customers");

      const data = await res.json();
      dispatch(fetchCustomersSuccess(data));
    } catch (err) {
      dispatch(fetchCustomersFailure(err.message));
    }
  };

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
