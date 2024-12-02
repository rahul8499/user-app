import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
      {
        params: { _page: page, _limit: limit },
      }
    );
    return {
      data: response.data,
      total: parseInt(response.headers["x-total-count"], 10) || 0, // Extract total count
    };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    currentPage: 1,
    itemsPerPage: 6,
    total: 0, // Add total to the state
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.total = action.payload.total; // Set total here
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;
