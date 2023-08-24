import { combineReducers } from 'redux';
// Register
import registerSlice from './register';
import resumeHeadlineSlice from './resumeHeadline';
import keySkillsSlice from './keySkills';
// jobSeeker resume/profile upload 
import jobSeekerUploadReducer from './jobSeekerProfile/uploadResume';

export const reducer = combineReducers({
    // Register
    register: registerSlice,
    resumeHeadline: resumeHeadlineSlice,
    keySkills: keySkillsSlice,
   
    jobSeekerResumeUpload: jobSeekerUploadReducer
});
