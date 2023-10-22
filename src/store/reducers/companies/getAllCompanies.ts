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
interface CompaniesLocation {
    id: number,
    title: string,
    status: boolean
}
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
interface CompanyType {
    id: number,
    title: string,
    status: boolean
}
interface Industry {
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
    companiesLocation: CompaniesLocation,
    // jobsRole: JobsRole,
    // industryType: industryType,
    department: Department,
    companyType: CompanyType,
    industry:Industry,
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
    location: any;
    companyType: any;
    industry: any;
    company: any;
    filtersData: any;
    checkItems: any;
    navigateFilterOption: string;
    departmentIds: number[];
    locationIds: number[];
    companyTypeIds: number[];
    industryIds: number[];
    companyIds: number[];
}
const initialState: AllCompaniesState = {
    loading: false,
    error: false,
    success: false,
    allCompanies: [],
    errorMessage: undefined,
    department: [],
    location: [],
    companyType: [],
    industry: [],
    company:[],
    filtersData: {
        department: [],
        location: [],
        companyType: [],
        industry: [],
        company:[]
    },
    checkItems: {
        department: [],
        location: [],
        companyType: [],
        industry: [],
        company:[],
        workMode: [],
    },
    navigateFilterOption: "",
    departmentIds: [],
    locationIds: [],
    companyTypeIds: [],
    industryIds: [],
    companyIds:[]
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
        setLocation: (state, action) => {
            state.location = action.payload;
            state.checkItems.location = action.payload;
        },
        setCompanyType: (state, action) => {
            state.companyType = action.payload;
            state.checkItems.companyType = action.payload;
        },
        setIndustry: (state, action) => {
            state.industry = action.payload;
            state.checkItems.industry = action.payload;
        },
        setCompany: (state, action) => {
            state.company = action.payload;
            state.checkItems.company = action.payload;
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
            if (action?.payload?.companyType) {
                state.checkItems.companyType = action?.payload?.companyType;
            }
            if (action?.payload?.industry) {
                state.checkItems.industry = action?.payload?.industry;
            }
            if (action?.payload?.company) {
                state.checkItems.company = action?.payload?.company;
            }
            // if (action?.payload?.workMode) {
            //     state.checkItems.workMode = action?.payload?.workMode;
            // }
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
        setFilterIndustry: (state, action) => {
            if (!action?.payload?.filterIndustry) {
                state?.filtersData?.industry?.push(action.payload);
                state?.industryIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.industry?.filter((item: any) => action?.payload?.filterIndustry !== item);
                state.filtersData.industry = filterData;
                state.industryIds = filterData;
            }
        },
        setFilterCompany: (state, action) => {
            if (!action?.payload?.filterCompany) {
                state?.filtersData?.company?.push(action.payload);
                state?.companyIds.push(action.payload);
            } else {
                const filterData = state?.filtersData?.company?.filter((item: any) => action?.payload?.filterCompany !== item);
                state.filtersData.company = filterData;
                state.companyIds = filterData;
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
        setCompanyTypeIds: (state, action) => {
            if (action?.payload?.filter) {
                const companyTypeFilter = state?.companyTypeIds?.filter((item: any) => item !== action?.payload?.filter);
                state.companyTypeIds = companyTypeFilter;
            } else {
                state.companyTypeIds?.push(action.payload);
            }
        },
        setIndustryIds: (state, action) => {
            if (action?.payload?.filter) {
                const industryFilter = state?.industryIds?.filter((item: any) => item !== action?.payload?.filter);
                state.industryIds = industryFilter;
            } else {
                state.industryIds?.push(action.payload);
            }
        },
        setCompanyIds: (state, action) => {
            if (action?.payload?.filter) {
                const companyFilter = state?.companyIds?.filter((item: any) => item !== action?.payload?.filter);
                state.companyIds = companyFilter;
            } else {
                state.companyIds?.push(action.payload);
            }
        },
        bulkFilter: (state, action) => {
            state.filtersData.department = action?.payload?.department;
            state.filtersData.location = action?.payload?.location;
            state.filtersData.companyType = action?.payload?.companyType;
            state.filtersData.industry = action?.payload?.industry;
            state.filtersData.company = action?.payload?.company;
        }
    }
});
export default getAllCompaniesSlice.reducer;
export const {
    clearGetAllCompaniesSlice,
    setDepartment,
    setLocation,
    setCompanyType,
    setIndustry,
    setCompany,
    setFilterDepartment,
    setFilterLocation,
    setFilterCompanyType,
    setFilterIndustry,
    setFilterCompany,
    setNavigateFilterOption,
    setCheckItems,
    setDepartmentIds,
    setLocationIds,
    setCompanyTypeIds,
    setIndustryIds,
    setCompanyIds,
    bulkFilter
} = getAllCompaniesSlice.actions;