import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTrusteesAPI,
  createTrusteeAPI,
  updateTrusteeAPI,
  deleteTrusteeAPI,
  getDonorCountsByTrusteeAPI, 
} from "../api/apiCalls";

// Async thunk to fetch trustees
export const fetchTrustees = createAsyncThunk(
  "trustees/fetchTrustees",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTrusteesAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to create a new trustee
export const createTrustee = createAsyncThunk(
  "trustees/createTrustee",
  async (trusteeData, { rejectWithValue }) => {
    try {
      const data = await createTrusteeAPI(trusteeData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to update a trustee
export const updateTrustee = createAsyncThunk(
  "trustees/updateTrustee",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const data = await updateTrusteeAPI(id, updatedData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to delete a trustee
export const deleteTrustee = createAsyncThunk(
  "trustees/deleteTrustee",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteTrusteeAPI(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Async thunk to fetch donor counts by trustee
export const fetchDonorCountsByTrustee = createAsyncThunk(
  "trustees/fetchDonorCountsByTrustee",
  async (trusteeIds, { rejectWithValue }) => {
    try {
      const data = await getDonorCountsByTrusteeAPI(trusteeIds);
      console.log(trusteeIds)
      return data; // [{ _id, trusteeName, donorCount }]
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  trustees: [],
  donorCounts: [], // ✅ Donor counts by trustee
  loading: false,
  error: null,
  creationMessage: null,
  confirmationMessage: null,
  showConfirmation: false,
  initialPassword: null,
};

// Slice
const trusteeSlice = createSlice({
  name: "trustees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Trustees
    builder
      .addCase(fetchTrustees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrustees.fulfilled, (state, action) => {
        state.loading = false;
        state.trustees = action.payload;
        console.log("Fetched Trustees:", action.payload);
      })
      .addCase(fetchTrustees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch trustees";
      });

    // Create Trustee
    builder
      .addCase(createTrustee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.creationMessage = null;
      })
      .addCase(createTrustee.fulfilled, (state, action) => {
        state.loading = false;
        state.creationMessage = action.payload.message;
        state.initialPassword = action.payload.initialPassword;
        state.confirmationMessage = action.payload.confirmationMessage;
        state.showConfirmation = action.payload.showConfirmation;
        state.trustees.push(action.payload.trustee);
        console.log("Created Trustee:", action.payload);
      })
      .addCase(createTrustee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create trustee";
      });

    // Update Trustee
    builder
      .addCase(updateTrustee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrustee.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTrustee = action.payload.trustee;
        const index = state.trustees.findIndex(
          (t) => t._id === updatedTrustee._id
        );
        if (index !== -1) {
          state.trustees[index] = {
            ...state.trustees[index],
            ...updatedTrustee,
            user: action.payload.user,
          };
        }
        console.log("Updated Trustee:", action.payload);
      })
      .addCase(updateTrustee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update trustee";
      });

    // Delete Trustee
    builder
      .addCase(deleteTrustee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrustee.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload.trustee._id;
        state.trustees = state.trustees.filter((t) => t._id !== deletedId);
        console.log("Deleted Trustee:", action.payload);
      })
      .addCase(deleteTrustee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete trustee";
      });

    // ✅ Donor Count by Trustee
    builder
      .addCase(fetchDonorCountsByTrustee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonorCountsByTrustee.fulfilled, (state, action) => {
        state.loading = false;
        state.donorCounts = action.payload;
        console.log("Fetched Donor Counts:", action.payload);
      })
      .addCase(fetchDonorCountsByTrustee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch donor counts";
      });
  },
});

export default trusteeSlice.reducer;
