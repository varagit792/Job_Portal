import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  password: string,
  email: string,
}
export interface logOutUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  logoutUser: Array<User>;
  errorMessage: string | undefined;

}
const initialState: logOutUserState = {
  loading: false,
  error: false,
  success: false,
  logoutUser: [],
  errorMessage: undefined,
}

export const logOutUser = createAsyncThunk(
  "logOut", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/auth/logout`
      );
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  });

const logOutSlice = createSlice({
  name: 'logOut',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logOutUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(logOutUser.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.logoutUser = action.payload;
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.logoutUser = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearLogOutSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default logOutSlice.reducer;
export const { clearLogOutSlice } = logOutSlice.actions;