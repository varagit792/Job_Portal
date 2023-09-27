import React from 'react';
import { Route, Routes } from "react-router-dom";
import LandingPage from '../components/views/LandingPage';
import SignUp from '../components/views/SignUp';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import HomePage from '../components/views/HomePage';
import Profile from '../components/views/Profile/Profile';
import SignIn from '../components/views/SignIn/SignIn';
import SignOut from '../components/views/SignIn/SignOut';
import AllJobs from '../components/views/Jobs/AllJobs';
import JobDescription from '../components/views/Jobs/JobDescription';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/registration" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
            </Route>
            <Route path="/allJobs" element={<AllJobs />} />
            <Route path="/allJobs/jobDescription" element={<JobDescription />} />
            {/* <Route path="/logout" element={<SignOut />} /> */}
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/homePage" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default AllRoutes;