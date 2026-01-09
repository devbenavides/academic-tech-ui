import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
    sub: string;
    idUser: number;
    roles: string[];
    permissions: string[];
    iat: number;
    exp: number;
}

export const decodeToken = (token: string): TokenPayload | null => {
    try {
        return jwtDecode<TokenPayload>(token);
    } catch (e) {
        console.error('Token invalido',e);
        return null;
    }
};