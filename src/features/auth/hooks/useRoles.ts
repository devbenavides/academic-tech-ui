import { useAuth } from "./useAuth";

export const useRoles = () => {
  const { user } = useAuth();

  const hasRole = (role: string) => user?.roles?.includes(role) ?? false;
  const hasPermission = (permission: string) =>
    user?.permissions?.includes(permission) ?? false;

  return { hasRole, hasPermission };
};