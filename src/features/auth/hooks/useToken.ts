import { useAuth } from "./useAuth";

export const useToken = () => {
  const { token } = useAuth();
  return token;
};