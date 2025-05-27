// src/Redux/slices/donorSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDonorsAPI,
  createDonorAPI,
  updateDonorAPI,
  toggleDonorStatusAPI,
  deleteDonorAPI, 
} from "../api/apiCalls";

// Async thunk to fetch donors
export const fetchDonors = createAsyncThunk(
  "donors/fetchDonors",
  async (_, thunkAPI) => {
    try {
      const donors = await getDonorsAPI();
      return donors;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch donors"
      );
    }
  }
);

// Async thunk to create a donor
export const createDonor = createAsyncThunk(
  "donors/createDonor",
  async (donorData, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const createdBy = user?._id;

      if (!createdBy) {
        throw new Error("User ID not found in localStorage.");
      }

      const donorWithCreator = {
        ...donorData,
        createdBy,
      };

      const response = await createDonorAPI(donorWithCreator);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to create donor"
      );
    }
  }
);

// ✅ Async thunk to update a donor
export const updateDonor = createAsyncThunk(
  "donors/updateDonor",
  async (donorData, thunkAPI) => {
    try {
      const response = await updateDonorAPI(donorData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update donor"
      );
    }
  }
);

// ✅ Async thunk to toggle donor status
export const toggleDonorStatus = createAsyncThunk(
  "donors/toggleDonorStatus",
  async (_id, thunkAPI) => {
    try {
      const response = await toggleDonorStatusAPI(_id);
      return response; // { message, donor }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to toggle donor status"
      );
    }
  }
);

// ✅ Async thunk to delete donor
export const deleteDonor = createAsyncThunk(
  "donors/deleteDonor",
  async (_id, thunkAPI) => {
    try {
      const response = await deleteDonorAPI(_id);
      return response; // { message, donor }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete donor"
      );
    }
  }
);

// Donor slice
const donorSlice = createSlice({
  name: "donors",
  initialState: {
    donorList: [],
    loading: false,
    error: null,
    createStatus: null,
    toastMessage: null,
    confirmationMessage: null,
    showConfirmation: false,
    initialPassword: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchDonors
      .addCase(fetchDonors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonors.fulfilled, (state, action) => {
        state.loading = false;
        state.donorList = action.payload;
      })
      .addCase(fetchDonors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createDonor
      .addCase(createDonor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createStatus = null;
      })
      .addCase(createDonor.fulfilled, (state, action) => {
        state.loading = false;
        const {
          donor,
          message,
          confirmationMessage,
          showConfirmation,
          initialPassword,
        } = action.payload;

        state.donorList.push(donor);
        state.createStatus = message;
        state.confirmationMessage = confirmationMessage;
        state.showConfirmation = showConfirmation;
        state.initialPassword = initialPassword;
      })
      .addCase(createDonor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.createStatus = null;
      })

      // updateDonor
      .addCase(updateDonor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDonor.fulfilled, (state, action) => {
        state.loading = false;
        const { donor, message } = action.payload;

        state.donorList = state.donorList.map((d) =>
          d._id === donor._id ? donor : d
        );
        state.createStatus = message;
      })
      .addCase(updateDonor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // toggleDonorStatus
      .addCase(toggleDonorStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleDonorStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { donor, message } = action.payload;

        state.donorList = state.donorList.map((d) =>
          d._id === donor._id ? donor : d
        );
        state.createStatus = message;
      })
      .addCase(toggleDonorStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ deleteDonor
      .addCase(deleteDonor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDonor.fulfilled, (state, action) => {
        state.loading = false;
        const { donor, message } = action.payload;

        state.donorList = state.donorList.filter((d) => d._id !== donor._id);
        state.createStatus = message;
      })
      .addCase(deleteDonor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default donorSlice.reducer;
