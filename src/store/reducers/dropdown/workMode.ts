import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface WorkMode {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  workMode: Array<WorkMode>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  workMode: [],
  errorMessage: undefined,
}

export const workModeGet = createAsyncThunk(
  "getWorkMode", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/workMode/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getWorkModeSlice = createSlice({
  name: 'getWorkMode',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(workModeGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(workModeGet.fulfilled, (state, action: PayloadAction<WorkMode[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.workMode = action.payload;
    });
    builder.addCase(workModeGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.workMode = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetWorkModeSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getWorkModeSlice.reducer;
export const { clearGetWorkModeSlice } = getWorkModeSlice.actions;