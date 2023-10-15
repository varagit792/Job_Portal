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
    department: any;
    location: any;
    workMode: any;
    roleCategory: any;
    expYear: any;
    filtersData: any;
    salary: any;
    navigateFilterOption: string;
    departmentIds: number[];
    locationIds: number[];
    workModeIds: number[];
    errorMessage: string | undefined;
}
const initialState: AllJobsState = {
    loading: false,
    error: false,
    success: false,
    allJobs: [],
    department: [],
    location: [],
    workMode: [],
    roleCategory: [],
    expYear: [],
    salary: [],
    filtersData: {
        expYear: null,
        department: [],
        location: [],
        workMode: [],
        salary: null,
        roleCategory: []
    },
    navigateFilterOption: "",
    departmentIds: [],
    locationIds: [],
    workModeIds: [],
    errorMessage: undefined,
}

export const getFilterJobs = createAsyncThunk(
    "jobList", async (data: any) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/jobs/list`, { params: data });
            if (response.status >= 200 && response.status < 300) {
                return response.data.data;
            }
        } catch (error) {
            throw error;
        }
    });

const getFilterJobsSlice = createSlice({
    name: "jobList",
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
        setDepartment: (state, action) => {
            state.department = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setWorkMode: (state, action) => {
            state.workMode = action.payload;
        },
        setRoleCategory: (state, action) => {
            state.roleCategory = action.payload;
        },
        setExpYears: (state, action) => {
            state.expYear = action.payload;
        },
        setSalarys: (state, action) => {
            state.salary = action.payload;
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
        setFilterLocation: (state, action) => {
            if (!action?.payload?.filterLocation) {
                state?.filtersData?.location?.push(action.payload);
                state?.locationIds.push(action.payload);
            } else {
                state.filtersData.location = state?.filtersData?.location?.filter((item: any) => action?.payload?.filterLocation !== item);
            }
        },
        setFilterWorkMode: (state, action) => {
            if (!action?.payload?.filterWorkMode) {
                state?.filtersData?.workMode?.push(action.payload);
                state?.workModeIds?.push(action.payload);
            } else {
                state.filtersData.workMode = state?.filtersData?.workMode?.filter((item: any) => action?.payload?.filterWorkMode !== item);
            }
        },
        setFilterRoleCategory: (state, action) => {
            if (!action?.payload?.filterRoleCategory) {
                state?.filtersData?.roleCategory?.push(action.payload);
            } else {
                state.filtersData.roleCategory = state?.filtersData?.roleCategory?.filter((item: any) => action?.payload?.filterRoleCategory !== item);
            }
        },
        setFilterExpYear: (state, action) => {
            const experienceYearsData = state?.expYear?.filter((item: any) => {
                let data = item?.title?.split('');
                let splitVal = data?.slice(0, data.length - 5);
                let joinedVal = parseInt(splitVal?.join(''));
                if (joinedVal === action.payload) {
                    return item
                }
            })
            state.filtersData.expYear = experienceYearsData?.[0]?.id;
        },
        setFilterSalary: (state, action) => {
            const salaryRangeListData = state?.salary?.filter((item: any) => parseInt(item?.title) === action.payload);
            state.filtersData.salary = salaryRangeListData?.[0]?.id;
        },
        bulkFilter: (state, action) => {
            state.filtersData.department = action?.payload?.department;
            state.filtersData.location = action?.payload?.location;
            state.filtersData.workMode = action?.payload?.workMode;
        },
        setNavigateFilterOption: (state, action) => {
            state.navigateFilterOption = action?.payload;
        },
        setDepartmentIds: (state, action) => {
            if (action?.payload?.filter) {
                const departmentFilter = state?.departmentIds?.filter((item: any) => item !== action?.payload?.filter);
                state.departmentIds = departmentFilter;
            } else {
                state.departmentIds?.push(action.payload);
            }
        },
        setLocationIds: (state, action) => {
            if (action?.payload?.filter) {
                const locationFilter = state?.locationIds?.filter((item: any) => item !== action?.payload?.filter);
                state.locationIds = locationFilter;
            } else {
                state.locationIds?.push(action.payload);
            }
        },
        setWorkModeIds: (state, action) => {
            if (action?.payload?.filter) {
                const workModeFilter = state?.workModeIds?.filter((item: any) => item !== action?.payload?.filter);
                state.workModeIds = workModeFilter;
            } else {
                state.workModeIds?.push(action.payload);
            }
        }
    }
});
export default getFilterJobsSlice.reducer;
export const { clearGetFilterJobsSlice,
    setDepartment,
    setLocation,
    setWorkMode,
    setRoleCategory,
    setExpYears,
    setSalarys,
    setFilterDepartment,
    setFilterLocation,
    setFilterWorkMode,
    setFilterRoleCategory,
    setFilterExpYear,
    setFilterSalary,
    bulkFilter,
    setNavigateFilterOption,
    setDepartmentIds,
    setLocationIds,
    setWorkModeIds } = getFilterJobsSlice.actions;