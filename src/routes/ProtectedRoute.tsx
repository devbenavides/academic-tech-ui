import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "../shared/utils/jwt";
import type React from "react";

interface ProtectedRouteProps{
    requiredRoles?: string[];
    requiredPermissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    requiredRoles, requiredPermissions
}) => {
    const token = localStorage.getItem('token');
    if(!token) return <Navigate to="/login"/>;

    const payload = decodeToken(token);

    if(!payload) return <Navigate to="/login"/>;

    if(requiredRoles && !requiredRoles.some(role => payload.roles.includes(role))){
        return <Navigate to="/unauthorized" />
    }

    if(requiredPermissions && !requiredPermissions.some(perm => payload.permissions.includes(perm))){
        return <Navigate to="/unauthorized" />
    }

    return <Outlet />;
};

export default ProtectedRoute;