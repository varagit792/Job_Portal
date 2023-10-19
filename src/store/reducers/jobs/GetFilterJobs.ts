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
interface EmploymentType {
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
    jobsKeySkills: Array<JobsKeySkills>,
    employmentType:EmploymentType
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
    companyType: any;
    expYear: any;
    filtersData: any;
    checkItems: any;
    salary: any;
    navigateFilterOption: string;
    departmentIds: number[];
    locationIds: number[];
    workModeIds: number[];
    companyTypeIds: number[];
    maxExpYearId: any;
    maxSalaryId: any;
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
    companyType: [],
    expYear: [],
    salary: [],
    filtersData: {
        expYear: null,
        department: [],
        location: [],
        workMode: [],
        salary: null,
        companyType: [],
        roleCategory: []
    },
    checkItems: {
        department: [],
        location: [],
        workMode: [],
        companyType: [],
    },
    navigateFilterOption: "",
    departmentIds: [],
    locationIds: [],
    workModeIds: [],
    companyTypeIds: [],
    maxExpYearId: null,
    maxSalaryId: null,
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
            state.checkItems.department = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
            state.checkItems.location = action.payload;
        },
        setWorkMode: (state, action) => {
            state.workMode = action.payload;
            state.checkItems.workMode = action.payload;
        },
        setCompanyType: (state, action) => {
            state.companyType = action.payload;
            state.checkItems.companyType = action.payload;
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
                const filterData = state?.filtersData?.department?.filter((item: any) => action?.payload?.filterDepartment !== item);
                state.filtersData.department = filterData;
                state.departmentIds = filterData;
            }
        },
        setFilterLocation: (state, action) => {
            if (!action?.payload?.filterLocation) {
                state?.filtersData?.location?.push(action.payload);
                state?.locationIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.location?.filter((item: any) => action?.payload?.filterLocation !== item);
                state.filtersData.location = filterData;
                state.locationIds = filterData;
            }
        },
        setFilterWorkMode: (state, action) => {
            if (!action?.payload?.filterWorkMode) {
                state?.filtersData?.workMode?.push(action.payload);
                state?.workModeIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.workMode?.filter((item: any) => action?.payload?.filterWorkMode !== item);
                state.filtersData.workMode = filterData;
                state.workModeIds = filterData;
            }
        },
        setFilterCompanyType: (state, action) => {
            if (!action?.payload?.filterCompanyType) {
                state?.filtersData?.companyType?.push(action.payload);
                state?.companyTypeIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.companyType?.filter((item: any) => action?.payload?.filterCompanyType !== item);
                state.filtersData.companyType = filterData;
                state.companyTypeIds = filterData;
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
            state.filtersData.expYear = action.payload !== 0 ? experienceYearsData?.[0]?.id : 0;
            state.maxExpYearId = action.payload !== 0 ? experienceYearsData?.[0]?.id : 0;
        },
        setFilterSalary: (state, action) => {
            const salaryRangeListData = state?.salary?.filter((item: any) => parseInt(item?.title) === action.payload);
            state.filtersData.salary = action.payload !== 0 ? salaryRangeListData?.[0]?.id : 0;
            state.maxSalaryId = action.payload !== 0 ? salaryRangeListData?.[0]?.id : 0;
        },
        bulkFilter: (state, action) => {
            state.filtersData.expYear = action?.payload?.expYear;
            state.filtersData.department = action?.payload?.department;
            state.filtersData.location = action?.payload?.location;
            state.filtersData.workMode = action?.payload?.workMode;
            state.filtersData.companyType = action?.payload?.companyType;
            state.filtersData.salary = action?.payload?.salary;
        },
        setNavigateFilterOption: (state, action) => {
            state.navigateFilterOption = action?.payload;
        },
        setCheckItems: (state, action) => {
            if (action?.payload?.department) {
                state.checkItems.department = action?.payload?.department;
            }
            if (action?.payload?.location) {
                state.checkItems.location = action?.payload?.location;
            }
            if (action?.payload?.workMode) {
                state.checkItems.workMode = action?.payload?.workMode;
            }
            if (action?.payload?.companyType) {
                state.checkItems.companyType = action?.payload?.companyType;
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
        },
        setCompanyTypeIds: (state, action) => {
            if (action?.payload?.filter) {
                const companyTypFilter = state?.companyTypeIds?.filter((item: any) => item !== action?.payload?.filter);
                state.companyTypeIds = companyTypFilter;
            } else {
                state.companyTypeIds?.push(action.payload);
            }
        },
        setMaxExpYearId: (state, action) => {
            state.maxExpYearId = action.payload;
        },
        setMaxSalaryId: (state, action) => {
            state.maxSalaryId = action.payload;
        },
        resetCheckItem: (state) => {
            state.checkItems.department = state?.department;
            const department = JSON.stringify(state?.department?.filter((item: any) => item?.isChecked));
            state.departmentIds = JSON.parse(department).map((item: any) => item.id);

            state.checkItems.location = state?.location;
            const location = JSON.stringify(state?.location?.filter((item: any) => item?.isChecked));
            state.locationIds = JSON.parse(location).map((item: any) => item.id);

            state.checkItems.workMode = state?.workMode;
            const workMode = JSON.stringify(state?.workMode?.filter((item: any) => item?.isChecked));
            state.workModeIds = JSON.parse(workMode).map((item: any) => item.id);

            state.checkItems.companyType = state?.companyType;
            const companyType = JSON.stringify(state?.companyType?.filter((item: any) => item?.isChecked));
            state.companyType = JSON.parse(companyType).map((item: any) => item.id);
        }
    }
});
export default getFilterJobsSlice.reducer;
export const { clearGetFilterJobsSlice,
    setDepartment,
    setLocation,
    setWorkMode,
    setRoleCategory,
    setCompanyType,
    setExpYears,
    setSalarys,
    setFilterDepartment,
    setFilterLocation,
    setFilterWorkMode,
    setFilterCompanyType,
    setFilterRoleCategory,
    setFilterExpYear,
    setFilterSalary,
    bulkFilter,
    setNavigateFilterOption,
    setCheckItems,
    setDepartmentIds,
    setLocationIds,
    setWorkModeIds,
    setCompanyTypeIds,
    setMaxExpYearId,
    setMaxSalaryId,
    resetCheckItem } = getFilterJobsSlice.actions;