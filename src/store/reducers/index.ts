import { combineReducers } from 'redux';
// Register
import registerSlice from './register';
import resumeHeadlineSlice from './jobSeekerProfile/profileResumeHeadline';
import keySkillsSlice from './jobSeekerProfile/keySkills';
// jobSeeker resume/profile upload 
import jobSeekerUploadReducer from './jobSeekerProfile/uploadResume';
import updateProfileDashboardSlice from './jobSeekerProfile/profileDashboardUpdate';
import getProfileDashboardSlice from './jobSeekerProfile/ProfileDashboardGet';
import jobSeekerEducation from './jobSeekerProfile/jobSeekerEducation';
import getEducationDetails from './jobSeekerProfile/getEducationDetails';
import updateCareerProfileUpdateSlice from './jobSeekerProfile/careerProfileUpdate';
import getIndustrySlice from './dropdown/industry';
import getDepartmentSlice from './dropdown/department';
import getRoleCategorySlice from './dropdown/roleCategory';
import getJobRoleSlice from './dropdown/jobRole';
import getWorkModeSlice from './dropdown/workMode';
import getLocalitySlice from './dropdown/locality';
import getRecurrenceSlice from './dropdown/recurrence';
import getNumberSystemSlice from './dropdown/numberSystem';
import getCompanySlice from './dropdown/company';
import getHighestQualificationSlice from './dropdown/highestQualification';
import getTotalExpYearSlice from './dropdown/totalExpYear';
import getCitySlice from './dropdown/city';
import getJobTitleSlice from './dropdown/jobTitle';
import getCurrencySlice from './dropdown/currency';
import getLocationSlice from './dropdown/location';
import getEmployeeTypeSlice from './dropdown/employeeType';
import getJobTypeSlice from './dropdown/jobType';
import getSalaryRangeSlice from './dropdown/salaryRange';
import getKeySkillsSlice from './dropdown/keySkills';
import getPreferredShiftSlice from './dropdown/preferredShift';
import getCareerProfileSlice from './jobSeekerProfile/getCareerProfile';
import jobSeekerDeleteResumeReducer from './jobSeekerProfile/deleteResume'
import jobSeekerPictureUploadSlice from './jobSeekerProfile/uploadProfilePicture';
import jobSeekerDeleteProfilePictureReducer from './jobSeekerProfile/deleteProfilePicture';
import getUserDataReducer from './user/getUserDetails';
import updateProfileBasicDetailsReducer from './jobSeekerProfile/profileBasicDetailsUpdate';
import personalDetailsSlice from './jobSeekerProfile/personalDetails';
import logOutSlice from './logout'
import loginSlice from './signIn'
import deletePersonalDetailsLanguagesSlice from './jobSeekerProfile/deletePersonalDetailsLanguages';
import jobSeekerEmployment from './jobSeekerProfile/jobSeekerEmploymentAdd';
import getProfileIndicatorSlice from './jobSeekerProfile/profileIndicator';
import getFilterJobsSlice from './jobs/GetFilterJobs';
import getJobDetailReducer from './jobs/GetJobDetails';
import getAllCompanies from './companies/getAllCompanies';


export const reducer = combineReducers({
    // Register
    register: registerSlice,
    login: loginSlice,
    logOut: logOutSlice,
    jobSeekerResumeUpload: jobSeekerUploadReducer,
    updateProfileDashboard: updateProfileDashboardSlice,
    updateCareerProfile: updateCareerProfileUpdateSlice,
    getProfileDashboard: getProfileDashboardSlice,
    updateResumeHeadline: resumeHeadlineSlice,
    keySkills: keySkillsSlice,
    education: jobSeekerEducation,
    educationDetails: getEducationDetails,
    employment: jobSeekerEmployment,
    getIndustry: getIndustrySlice,
    getRecurrence: getRecurrenceSlice,
    getTotalExpYear: getTotalExpYearSlice,
    getLocality: getLocalitySlice,
    getNumberSystem: getNumberSystemSlice,
    getCompany: getCompanySlice,
    getHighestQualification: getHighestQualificationSlice,
    getSalaryRange: getSalaryRangeSlice,
    getCity: getCitySlice,
    getDepartment: getDepartmentSlice,
    getRoleCategory: getRoleCategorySlice,
    getJobRole: getJobRoleSlice,
    getJobTitle: getJobTitleSlice,
    getCurrency: getCurrencySlice,
    getLocation: getLocationSlice,
    getEmployeeType: getEmployeeTypeSlice,
    getJobType: getJobTypeSlice,
    getPreferredShift: getPreferredShiftSlice,
    getCareerProfile: getCareerProfileSlice,
    getKeySkills: getKeySkillsSlice,
    getWorkMode: getWorkModeSlice,
    jobSeekerDeleteResume: jobSeekerDeleteResumeReducer,
    jobSeekerUploadProfilePicture: jobSeekerPictureUploadSlice,
    jobSeekerDeleteProfilePicture: jobSeekerDeleteProfilePictureReducer,
    getUser: getUserDataReducer,
    updateProfileBasicDetails: updateProfileBasicDetailsReducer,
    personalDetails: personalDetailsSlice,
    deletePersonalDetailsLanguages: deletePersonalDetailsLanguagesSlice,
    getProfileIndicator: getProfileIndicatorSlice,
    getFilterJobs: getFilterJobsSlice,
    getJobDetail: getJobDetailReducer,
    getAllCompanies: getAllCompanies,
});
