import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// interface Company {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface TotalExpYearStart {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface TotalExpYearEnd {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface NumberSystem {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface Recurrence {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface JobsLocation {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface JobsRole {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface industryType {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface Department {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface EmployeeType {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface JobType {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface RoleCategory {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface Education {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface KeySkills {
//     id: number,
//     title: string,
//     status: boolean
// }
// interface JobsKeySkills {
//     id: number,
//     preferred: boolean,
//     keySkills: KeySkills
// }
interface AllCompanies {
    id: number,
    title: string,
    // payScaleLowerRange: number,
    // jobsOpening: number,
    // userType: string,
    // payScaleUpperRange: number,
    companyDescription: string,
    createdAt: string,
    updatedAt: string,
    status: boolean,
    // company: Company,
    // totalExpYearStart: TotalExpYearStart,
    // totalExpYearEnd: TotalExpYearEnd,
    // numberSystem: NumberSystem,
    // recurrence: Recurrence,
    // jobsLocation: JobsLocation,
    // jobsRole: JobsRole,
    // industryType: industryType,
    // department: Department,
    // employeeType: EmployeeType,
    // jobType: JobType,
    // roleCategory: RoleCategory,
    // education: Education,
    user: null,
    //jobsKeySkills: Array<JobsKeySkills>
}
interface AllCompaniesState {
    loading: boolean;
    error: boolean;
    success: boolean;
    allCompanies: Array<AllCompanies>;
    errorMessage: string | undefined;
}
const initialState: AllCompaniesState = {
    loading: false,
    error: false,
    success: false,
    allCompanies: [],
    errorMessage: undefined,
}

export const getAllCompanies = createAsyncThunk(
    "getAllCompanies", async (data: number) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/companies/all/${data}`);
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            }
        } catch (error) {
            throw error;
        }
    });

const getAllCompaniesSlice = createSlice({
    name: 'getAllCompanies',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCompanies.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(getAllCompanies.fulfilled, (state, action: PayloadAction<Array<AllCompanies>>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.allCompanies = action.payload;
        });
        builder.addCase(getAllCompanies.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = true;
            state.errorMessage = action.error.message;
        });
    },
    reducers: {
        clearGetAllCompaniesSlice: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            return state;
        },
    }
});
export default getAllCompaniesSlice.reducer;
export const { clearGetAllCompaniesSlice } = getAllCompaniesSlice.actions;