import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
 
const ProtectedRoute = () => {    
    const user_token = Cookies.get('token');
    const user_type = Cookies.get('userType');
    
    const seekerArr = [
        "/homePage",
        "/profile"
    ]
    
    const employerArr = [
        "/employerDashboard",
        "/recruiterJobList",
        "/postJob/jobDetails",
        "/postJob/requirements",
        "/postJob/company",
        "/postJob/recruiter",
        "/postJob/questionnaire",
        "/postJob/response",
        "/postJob/preview",
    ]
    
    const location = useLocation();    

    return (user_token !== undefined && user_token !== null)
        ? (user_type === "jobSeeker" && seekerArr.includes(location.pathname)
            ? <Outlet />
            : (user_type === "employer" && employerArr.some(a =>location.pathname.includes(a))) ? <Outlet /> : <Navigate to="/" />)
        : <Navigate to="/" />
}

export default ProtectedRoute;