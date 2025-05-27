// src/Redux/slices/donationSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDonationsAPI, getCausesAPI } from "../api/apiCalls";

// Async thunk to fetch donations
export const fetchDonations = createAsyncThunk(
  "donations/fetchDonations",
  async (_, thunkAPI) => {
    try {
      const data = await getDonationsAPI();
      return data; // array of donations
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Async thunk to fetch causes
export const fetchCauses = createAsyncThunk(
  "donations/fetchCauses",
  async (_, thunkAPI) => {
    try {
      const data = await getCausesAPI();
      return data; // array of causes
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Initial state
const initialState = {
  donations: [],
  causes: [],       // new array for causes
  loading: false,
  error: null,
  causesLoading: false,  // loading state for causes
  causesError: null,     // error state for causes
};

const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {
    // add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // fetchDonations cases
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchCauses cases
      .addCase(fetchCauses.pending, (state) => {
        state.causesLoading = true;
        state.causesError = null;
      })
      .addCase(fetchCauses.fulfilled, (state, action) => {
        state.causesLoading = false;
        state.causes = action.payload;
      })
      .addCase(fetchCauses.rejected, (state, action) => {
        state.causesLoading = false;
        state.causesError = action.payload;
      });
  },
});

export default donationSlice.reducer;
