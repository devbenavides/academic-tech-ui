
import api from "../../../services/api";

export interface LoginRequest{
    username: string;
    password: string;
}

export interface LoginResponse{
    token: string;
}

export const login = async(
    data: LoginRequest
):Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        '/api/v1/auth/login',
        data
    );

    return response.data;
};