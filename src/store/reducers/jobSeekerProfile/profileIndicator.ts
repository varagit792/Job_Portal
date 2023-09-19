import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


interface ProfileIndicatorData {
  id: number,
  profileIndicator: number
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  profileIndicator: Array<ProfileIndicatorData>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  profileIndicator: [],
  errorMessage: undefined,
}

export const profileIndicatorGet = createAsyncThunk(
  "getProfileIndicator", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/profileIndicator`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getProfileIndicatorSlice = createSlice({
  name: 'getProfileIndicator',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(profileIndicatorGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(profileIndicatorGet.fulfilled, (state, action: PayloadAction<ProfileIndicatorData[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.profileIndicator = action.payload;
    });
    builder.addCase(profileIndicatorGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.profileIndicator = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetProfileIndicator: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getProfileIndicatorSlice.reducer;
export const { clearGetProfileIndicator } = getProfileIndicatorSlice.actions;