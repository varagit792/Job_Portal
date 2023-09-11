import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  password: string,
  email: string,
}
export interface signInUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  user: Array<User>;
  errorMessage: string | undefined;

}
const initialState: signInUserState = {
  loading: false,
  error: false,
  success: false,
  user: [],
  errorMessage: undefined,
}

export const signInUser = createAsyncThunk(
  "signIn", async (data: User) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/auth/login`,
        {
          password: data.password,
          email: data.email,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  });

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(signInUser.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.user = action.payload;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.user = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearSignInSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default signInSlice.reducer;
export const { clearSignInSlice } = signInSlice.actions;