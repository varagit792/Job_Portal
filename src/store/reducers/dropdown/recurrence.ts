
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Recurrence {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  recurrence: Array<Recurrence>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  recurrence: [],
  errorMessage: undefined,
}

export const recurrenceGet = createAsyncThunk(
  "getRecurrence", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/recurrence/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getRecurrenceSlice = createSlice({
  name: 'getRecurrence',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(recurrenceGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(recurrenceGet.fulfilled, (state, action: PayloadAction<Recurrence[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.recurrence = action.payload;
    });
    builder.addCase(recurrenceGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.recurrence = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetRecurrenceSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getRecurrenceSlice.reducer;
export const { clearGetRecurrenceSlice } = getRecurrenceSlice.actions;