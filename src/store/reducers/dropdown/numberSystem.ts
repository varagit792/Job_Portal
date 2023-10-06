import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface NumberSystem {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  numberSystem: Array<NumberSystem>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  numberSystem: [],
  errorMessage: undefined,
}

export const numberSystemGet = createAsyncThunk(
  "getNumberSystem", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/numberSystem/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getNumberSystemSlice = createSlice({
  name: 'getNumberSystem',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(numberSystemGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(numberSystemGet.fulfilled, (state, action: PayloadAction<NumberSystem[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.numberSystem = action.payload;
    });
    builder.addCase(numberSystemGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.numberSystem = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetNumberSystemSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getNumberSystemSlice.reducer;
export const { clearGetNumberSystemSlice } = getNumberSystemSlice.actions;