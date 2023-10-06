import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface SalaryRange {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  salaryRange: Array<SalaryRange>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  salaryRange: [],
  errorMessage: undefined,
}

export const salaryRangeGet = createAsyncThunk(
  "getSalaryRange", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/salaryRange/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getSalaryRangeSlice = createSlice({
  name: 'getSalaryRange',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(salaryRangeGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(salaryRangeGet.fulfilled, (state, action: PayloadAction<SalaryRange[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.salaryRange = action.payload;
    });
    builder.addCase(salaryRangeGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.salaryRange = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetSalaryRangeSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getSalaryRangeSlice.reducer;
export const { clearGetSalaryRangeSlice } = getSalaryRangeSlice.actions;