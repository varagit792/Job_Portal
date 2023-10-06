import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Locality {
  id: number,
  title: string,
}

interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  locality: Array<Locality>;
  errorMessage: string | undefined;
}
const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  locality: [],
  errorMessage: undefined,
}

export const localityGet = createAsyncThunk(
  "getLocality", async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/locality/get`);
      if (response.status >= 200 && response.status < 300) {
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  });

const getLocalitySlice = createSlice({
  name: 'getLocality',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(localityGet.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(localityGet.fulfilled, (state, action: PayloadAction<Locality[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.locality = action.payload;
    });
    builder.addCase(localityGet.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.locality = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearGetLocalitySlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
  }
});
export default getLocalitySlice.reducer;
export const { clearGetLocalitySlice } = getLocalitySlice.actions;