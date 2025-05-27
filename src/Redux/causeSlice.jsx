// src/Redux/slices/causeSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCausesAPI,
  createCauseAPI,
  deleteCauseAPI,
  updateCauseAPI,
} from "../api/apiCalls";

// ✅ Thunk to fetch all causes
export const fetchCauses = createAsyncThunk(
  "causes/fetchCauses",
  async (_, thunkAPI) => {
    try {
      const data = await getCausesAPI();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch causes"
      );
    }
  }
);

// ✅ Thunk to create a new cause
export const createCause = createAsyncThunk(
  "causes/createCause",
  async (formData, thunkAPI) => {
    try {
      const data = await createCauseAPI({
        ...formData,
        status: "active",
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create cause"
      );
    }
  }
);

// ✅ Thunk to delete a cause
export const deleteCause = createAsyncThunk(
  "causes/deleteCause",
  async (_id, thunkAPI) => {
    try {
      const data = await deleteCauseAPI(_id);
      return { _id, message: data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete cause"
      );
    }
  }
);

// ✅ Thunk to update a cause
export const updateCause = createAsyncThunk(
  "causes/updateCause",
  async (formData, thunkAPI) => {
    try {
      const data = await updateCauseAPI(formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update cause"
      );
    }
  }
);

// ✅ Initial State
const causeSlice = createSlice({
  name: "causes",
  initialState: {
    causes: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearCauseMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 👉 Fetch Causes
      .addCase(fetchCauses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCauses.fulfilled, (state, action) => {
        state.loading = false;
        state.causes = action.payload;
      })
      .addCase(fetchCauses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👉 Create Cause
      .addCase(createCause.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createCause.fulfilled, (state, action) => {
        state.loading = false;
        state.causes.push(action.payload);
        state.successMessage = "Cause created successfully";
      })
      .addCase(createCause.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👉 Delete Cause
      .addCase(deleteCause.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteCause.fulfilled, (state, action) => {
        state.loading = false;
        state.causes = state.causes.filter(
          (cause) => cause._id !== action.payload._id
        );
        state.successMessage = action.payload.message || "Cause deleted successfully";
      })
      .addCase(deleteCause.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👉 Update Cause
      .addCase(updateCause.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateCause.fulfilled, (state, action) => {
        state.loading = false;
        state.causes = state.causes.map((cause) =>
          cause._id === action.payload._id ? action.payload : cause
        );
        state.successMessage = "Cause updated successfully";
      })
      .addCase(updateCause.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCauseMessages } = causeSlice.actions;
export default causeSlice.reducer;
