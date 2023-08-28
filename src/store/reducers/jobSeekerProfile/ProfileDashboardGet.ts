import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


interface ProfileDashboard {
    id: number,
    profileSummary: string,
}

interface registerUserState {
    loading: boolean;
    error: boolean;
    success: boolean;
    profileDashboard: Array<ProfileDashboard>;
    errorMessage: string | undefined;
}
const initialState: registerUserState = {
    loading: false,
    error: false,
    success: false,
    profileDashboard: [],
    errorMessage: undefined,
}

export const profileDashboardGet = createAsyncThunk(
    "getProfileDashboard", async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobSeekerProfile/getProfileDashboard`,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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

const getProfileDashboardSlice = createSlice({
    name: 'getProfileDashboard',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(profileDashboardGet.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(profileDashboardGet.fulfilled, (state, action: PayloadAction<ProfileDashboard[]>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.profileDashboard = action.payload;
        });
        builder.addCase(profileDashboardGet.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.profileDashboard = [];
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearGetProfileDashboardSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default getProfileDashboardSlice.reducer;
export const { clearGetProfileDashboardSlice } = getProfileDashboardSlice.actions;