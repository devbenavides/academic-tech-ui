import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { login, logout } from "../store/authSlice";
import type { LoginRequest } from "../types/auth.types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const loginUser = (credentials: LoginRequest) => dispatch(login(credentials));
  const logoutUser = () => dispatch(logout());

  return { user, token, isAuthenticated, loading, error, loginUser, logoutUser };
};