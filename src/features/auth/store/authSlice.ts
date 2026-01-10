import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, CustomJwtPayload, LoginRequest, LoginResponse } from '../types/auth.types';
import { decodeJwt, isTokenExpired } from '../../../shared/utils/jwt';
import { authService } from '../services/auth.service';

// --- Extraer token de localStorage al iniciar la app ---
const tokenFromStorage = localStorage.getItem("token");

let userFromToken: CustomJwtPayload | null = null;

if (tokenFromStorage && typeof tokenFromStorage === "string") {
  try {
    const decoded = decodeJwt(tokenFromStorage);
    if (!isTokenExpired(decoded.exp)) {
      userFromToken = decoded;
    } else {
      localStorage.removeItem("token");
    }
  } catch (err) {
    console.error("Token inválido en storage:", err);
    localStorage.removeItem("token");
  }
}

// --- Estado inicial ---
const initialState: AuthState = {
  token: tokenFromStorage,
  user: userFromToken,
  isAuthenticated: !!userFromToken,
  loading: false,
  error: null,
};

// --- AsyncThunk para login ---
export const login = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials); // ✅ llama al servicio
      return response; // { token: string }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login error");
    }
  }
);

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        const token = action.payload?.token;

        if (token && typeof token === "string") {
          try {
            const decoded = decodeJwt(token);

            state.token = token;
            state.user = decoded;
            state.isAuthenticated = true;
            state.loading = false;

            localStorage.setItem("token", token);
          } catch (err) {
            console.error("Token inválido al hacer login:", err);
            state.error = "Token inválido";
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
          }
        } else {
          state.error = "Token inválido o vacío";
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// --- Helpers para roles y permisos ---
export const hasRole = (user: CustomJwtPayload | null, role: string) =>
  user?.roles.includes(role);

export const hasPermission = (user: CustomJwtPayload | null, perm: string) =>
  user?.permissions.includes(perm);