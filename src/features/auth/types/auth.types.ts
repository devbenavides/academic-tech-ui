import type { JwtPayload as BaseJwtPayload} from "jwt-decode";

export interface LoginResponse {
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CustomJwtPayload extends BaseJwtPayload{
    sub: string;
  idUser: number;
  roles: string[];
  permissions: string[];
  iat: number;
  exp: number;
}

export interface AuthState{
    token: string | null;
    user: CustomJwtPayload | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}