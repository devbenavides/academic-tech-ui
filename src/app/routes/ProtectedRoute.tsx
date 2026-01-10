import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { JSX } from 'react';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

const ProtectedRoute = ({ children, requiredRoles, requiredPermissions }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !requiredRoles.some((role) => user.roles.includes(role))) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredPermissions &&
    !requiredPermissions.some((perm) => user.permissions.includes(perm))
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
