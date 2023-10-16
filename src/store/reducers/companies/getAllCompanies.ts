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
interface Department {
    id: number,
    title: string,
    status: boolean
}
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
    department: Department,
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
    department: any;
    filtersData: any;
    checkItems: any;
    navigateFilterOption: string;
    departmentIds: number[];
}
const initialState: AllCompaniesState = {
    loading: false,
    error: false,
    success: false,
    allCompanies: [],
    errorMessage: undefined,
    department: [],
    filtersData: {
        department: [],
    },
    checkItems: {
        department: [],
        location: [],
        workMode: [],
    },
    navigateFilterOption: "",
    departmentIds: []
}

export const getAllCompanies = createAsyncThunk(
    "getAllCompanies", async (data: any) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/companies/all`, { params: data && data });
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
        setDepartment: (state, action) => {
            state.department = action.payload;
            state.checkItems.department = action.payload;
        },
        setNavigateFilterOption: (state, action) => {
            state.navigateFilterOption = action?.payload;
        },
        setCheckItems: (state, action) => {
            if (action?.payload?.department) {
                state.checkItems.department = action?.payload?.department;
            }
            // if (action?.payload?.location) {
            //     state.checkItems.location = action?.payload?.location;
            // }
            // if (action?.payload?.workMode) {
            //     state.checkItems.workMode = action?.payload?.workMode;
            // }
        },
        setFilterDepartment: (state, action) => {
            if (!action?.payload?.filterDepartment) {
                state?.filtersData?.department?.push(action.payload);
                state?.departmentIds.push(action.payload);
            } else {
                const filterDate = state?.filtersData?.department?.filter((item: any) => action?.payload?.filterDepartment !== item);
                state.filtersData.department = filterDate;
                state.departmentIds = filterDate;
            }
        },
        setDepartmentIds: (state, action) => {
            if (action?.payload?.filter) {
                const departmentFilter = state?.departmentIds?.filter((item: any) => item !== action?.payload?.filter);
                state.departmentIds = departmentFilter;
            } else {
                state.departmentIds?.push(action.payload);
            }
        },
        bulkFilter: (state, action) => {
            state.filtersData.department = action?.payload?.department;
        }
    }
});
export default getAllCompaniesSlice.reducer;
export const {
    clearGetAllCompaniesSlice,
    setDepartment,
    setFilterDepartment,
    setNavigateFilterOption,
    setCheckItems,
    setDepartmentIds,
    bulkFilter
} = getAllCompaniesSlice.actions;