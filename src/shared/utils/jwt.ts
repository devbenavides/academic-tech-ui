import { jwtDecode } from 'jwt-decode';
import type { CustomJwtPayload } from '../../features/auth/types/auth.types';

/**
 * Decodifica un JWT y devuelve el payload tipado.
 * Envuelve jwtDecode y maneja cualquier error.
 */
export const decodeJwt = (token: string): CustomJwtPayload => {
  try {
    return jwtDecode(token) as CustomJwtPayload;
  } catch (err) {
    console.error('Error decodificando JWT:', err);
    throw err;
  }
};

/**
 * Verifica si un token expiró
 */
export const isTokenExpired = (exp: number): boolean => {
  return Date.now() >= exp * 1000;
};
