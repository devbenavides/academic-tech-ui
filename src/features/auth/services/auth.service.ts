import api from "../../../services/api";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/api/v1/auth/login", data);
    return response.data; // debe ser { token: string }
  },
};