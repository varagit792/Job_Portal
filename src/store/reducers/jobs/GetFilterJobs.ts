import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Company {
    id: number,
    title: string,
    status: boolean
}
interface TotalExpYearStart {
    id: number,
    title: string,
    status: boolean
}
interface TotalExpYearEnd {
    id: number,
    title: string,
    status: boolean
}
interface NumberSystem {
    id: number,
    title: string,
    status: boolean
}
interface Recurrence {
    id: number,
    title: string,
    status: boolean
}
interface JobsLocation {
    id: number,
    title: string,
    status: boolean
}
interface JobsRole {
    id: number,
    title: string,
    status: boolean
}
interface industryType {
    id: number,
    title: string,
    status: boolean
}
interface Department {
    id: number,
    title: string,
    status: boolean
}
interface EmployeeType {
    id: number,
    title: string,
    status: boolean
}
interface JobType {
    id: number,
    title: string,
    status: boolean
}
interface RoleCategory {
    id: number,
    title: string,
    status: boolean
}
interface Education {
    id: number,
    title: string,
    status: boolean
}
interface KeySkills {
    id: number,
    title: string,
    status: boolean
}
interface JobsKeySkills {
    id: number,
    preferred: boolean,
    keySkills: KeySkills
}
interface AllJobs {
    id: number,
    title: string,
    payScaleLowerRange: number,
    jobsOpening: number,
    userType: string,
    payScaleUpperRange: number,
    jobDescription: string,
    createdAt: string,
    updatedAt: string,
    status: boolean,
    company: Company,
    totalExpYearStart: TotalExpYearStart,
    totalExpYearEnd: TotalExpYearEnd,
    numberSystem: NumberSystem,
    recurrence: Recurrence,
    jobsLocation: JobsLocation,
    jobsRole: JobsRole,
    industryType: industryType,
    department: Department,
    employeeType: EmployeeType,
    jobType: JobType,
    roleCategory: RoleCategory,
    education: Education,
    user: null,
    jobsKeySkills: Array<JobsKeySkills>
}
interface AllJobsState {
    loading: boolean;
    error: boolean;
    success: boolean;
    allJobs: Array<AllJobs>;
    errorMessage: string | undefined;
}
const initialState: AllJobsState = {
    loading: false,
    error: false,
    success: false,
    allJobs: [],
    errorMessage: undefined,
}

export const getFilterJobs = createAsyncThunk(
    "jobs/filters", async (data: any) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobs/filters`, { params: data });
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            }
        } catch (error) {
            throw error;
        }
    });

const getFilterJobsSlice = createSlice({
    name: 'jobs/filters',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getFilterJobs.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(getFilterJobs.fulfilled, (state, action: PayloadAction<Array<AllJobs>>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.allJobs = action.payload;
        });
        builder.addCase(getFilterJobs.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearGetFilterJobsSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default getFilterJobsSlice.reducer;
export const { clearGetFilterJobsSlice } = getFilterJobsSlice.actions;