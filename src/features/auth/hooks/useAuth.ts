import { useState } from "react";
import { login as loginService } from "../services/authService";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async(username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginService({username,password});

            localStorage.setItem('token',data.token);

            return true;
        } catch (err) {
            setError('Credenciales incorrectas');
            return false;
        }finally{
            setLoading(false);
        }
    };

    const logout = () => {
localStorage.removeItem('token');
    };

    const isAuthenticated = () =>{
        return !!localStorage.getItem('token');
    };

    return {
        login,
        logout,
        loading,
        error,
        isAuthenticated,
    };

};