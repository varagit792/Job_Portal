import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
    name: string,
    password: string,
    email: string,
    mobileNumber: string,
    userType: string,
    workStatus: boolean
}
export interface registerUserState {
    loading: boolean;
    error: boolean;
    success: boolean;
    user: Array<User>;
    errorMessage: string | undefined;

}
const initialState: registerUserState = {
    loading: false,
    error: false,
    success: false,
    user: [],
    errorMessage: undefined,
}



export const registerUser = createAsyncThunk(
    "register", async (data: User) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}/auth/register`,
                {
                    name: data.name,
                    password: data.password,
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                    userType: data.userType,
                    workStatus: data.workStatus,
                }
            );

            if (response.status >= 200 && response.status < 300) {
                Cookies.set("name", response.data.data.name);
                Cookies.set("token", response.data.token);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    });

const registerSlice = createSlice({
    name: 'register',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = action.payload;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.user = [];
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearRegisterSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default registerSlice.reducer;
export const { clearRegisterSlice } = registerSlice.actions;