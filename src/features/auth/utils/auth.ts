import { decodeToken } from '../../../shared/utils/jwt';
import type { TokenPayload } from '../../../shared/utils/jwt';

export const getAuthInfo = (): TokenPayload | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return decodeToken(token);
};

export const hasRole = (role: string): boolean => {
  const auth = getAuthInfo();
  return auth ? auth.roles.includes(role) : false;
};

export const hasPermission = (permission: string): boolean => {
  const auth = getAuthInfo();
  return auth ? auth.permissions.includes(permission) : false;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
