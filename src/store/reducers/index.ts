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
import getCurrencySlice from './dropdown/currency';
import getLocationSlice from './dropdown/location';
import getEmployeeTypeSlice from './dropdown/employeeType';
import getJobTypeSlice from './dropdown/jobType';
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
    getDepartment: getDepartmentSlice,
    getRoleCategory: getRoleCategorySlice,
    getJobRole: getJobRoleSlice,
    getCurrency: getCurrencySlice,
    getLocation: getLocationSlice,
    getEmployeeType: getEmployeeTypeSlice,
    getJobType: getJobTypeSlice,
    getPreferredShift: getPreferredShiftSlice,
    getCareerProfile: getCareerProfileSlice,
    getKeySkills: getKeySkillsSlice,
    jobSeekerDeleteResume: jobSeekerDeleteResumeReducer,
    jobSeekerUploadProfilePicture: jobSeekerPictureUploadSlice,
    jobSeekerDeleteProfilePicture: jobSeekerDeleteProfilePictureReducer,
    getUser: getUserDataReducer,
    updateProfileBasicDetails: updateProfileBasicDetailsReducer,
    personalDetails: personalDetailsSlice,
    deletePersonalDetailsLanguages: deletePersonalDetailsLanguagesSlice,
    getProfileIndicator: getProfileIndicatorSlice,
});
