import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const PublicRoute = () => {
    const user_token = Cookies.get('token');
    return (user_token !== undefined && user_token !== null) ? <Navigate to="/homePage" /> : <Outlet />
}

export default PublicRoute;