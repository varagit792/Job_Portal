import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PostJobUpdate } from '../../../interface/employer';

export interface registerUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  postJob: Array<PostJobUpdate>;
  formData: any;
  errorMessage: string | undefined;
}

const initialState: registerUserState = {
  loading: false,
  error: false,
  success: false,
  postJob: [],
  formData: {},
  errorMessage: undefined,
}

export const postJobUpdate = createAsyncThunk(
  "postJob", async (data: PostJobUpdate) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/jobs/post`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("formData===", response.status);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  });

const updatePostJobUpdateSlice = createSlice({
  name: 'postJob',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postJobUpdate.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(postJobUpdate.fulfilled, (state, action: PayloadAction<PostJobUpdate[]>) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.postJob = action.payload;
    });
    builder.addCase(postJobUpdate.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = true;
      state.postJob = [];
      state.errorMessage = action.error.message;
    });
  },
  reducers: {
    clearUpdatePostJobUpdateSlice: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      return state;
    },
    formData: (state, action) => {
      console.log("action.payload", action.payload);

      state.formData = { ...state.formData, ...action.payload };
    },
  }
});
export default updatePostJobUpdateSlice.reducer;
export const { clearUpdatePostJobUpdateSlice, formData } = updatePostJobUpdateSlice.actions;