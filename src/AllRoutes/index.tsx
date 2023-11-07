import React from 'react';
import { Route, Routes } from "react-router-dom";
import LandingPage from '../components/views/LandingPage';
import SignUp from '../components/views/SignUp';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import HomePage from '../components/views/HomePage';
import Profile from '../components/views/Profile/Profile';
import AllJobs from '../components/views/Jobs/AllJobs';
import JobDescription from '../components/views/Jobs/JobDescription';
import AllCompanies from '../components/views/Companies/AllCompanies';
import CompanyDescription from '../components/views/Companies/CompanyDescription';
import JobDetails from '../components/views/Recruiter/PostJob/JobDetails';
import Requirements from '../components/views/Recruiter/PostJob/Requirements';
import Company from '../components/views/Recruiter/PostJob/Company';
import Recruiter from '../components/views/Recruiter/PostJob/Recruiter';
import Response from '../components/views/Recruiter/PostJob/Response';
import NoMatch from '../components/views/NoMatch';
import Preview from '../components/views/Recruiter/PostJob/preview';
import EmployerDashboard from '../components/views/Recruiter/Dashboard/EmployerDashboard';
import RecruiterJobList from '../components/views/Recruiter/Jobs/RecruiterJobList';
import Questionnaire from '../components/views/Recruiter/PostJob/Questionnaire';
import SignIn from '../components/views/SignIn';

const AllRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<PublicRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/registration" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
            </Route>
            <Route path="/allJobs" element={<AllJobs />} />
            <Route path="/allCompanies" element={<AllCompanies />} />
            <Route path="/allJobs/jobDescription/:id" element={<JobDescription />} />
            <Route path="/allCompanies/companyDescription/:id" element={<CompanyDescription />} />
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/homePage" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/employerDashboard" element={<EmployerDashboard />} />
                <Route path="/recruiterJobList" element={<RecruiterJobList />} />
                <Route path="/postJob" >
                    <Route path="jobDetails?/:postId" element={<JobDetails />} />
                    <Route path="requirements/:postId?" element={<Requirements />} />
                    <Route path="company/:postId?" element={<Company />} />
                    <Route path="recruiter/:postId?" element={<Recruiter />} />
                    <Route path="questionnaire/:postId?" element={<Questionnaire />} />
                    <Route path="response/:postId?" element={<Response />} />
                    <Route path="preview/:postId?" element={<Preview />} />
                </Route>
            </Route>
            <Route path="*" element={<NoMatch />} />
        </Routes>
    )
}

export default AllRoutes;