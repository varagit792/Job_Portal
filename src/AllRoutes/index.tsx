import React from 'react';
import { Route, Routes } from "react-router-dom";
import LandingPage from '../components/views/LandingPage';
import SignUp from '../components/views/SignUp';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../components/views/HomePage';
import Profile from '../components/views/Profile/Profile';
import SignIn from '../components/views/SignIn/SignIn';
import SignOut from '../components/views/SignIn/SignOut';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registration" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            {/* <Route path="/logout" element={<SignOut />} /> */}
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/homePage" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default AllRoutes;