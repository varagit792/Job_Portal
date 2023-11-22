import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const userType = Cookies.get("userType");
export const JobSeekerRoute = () => {    
    return (userType === "jobSeeker") ? <Outlet /> : <Navigate to="/" />
}

export const EmployerRoute = () => {
    return (userType === "employer") ? <Outlet /> : <Navigate to="/" />
}