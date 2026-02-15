import { useState } from "react";
import { deleteStudent } from "../services/studentService";
import axios from "axios";
import { toastService } from "../../../shared/services/toastService";

export const useDeleteStudent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const execute = async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            await deleteStudent(id);
            return true;
        } catch (err: unknown) {
            let message = "Error al eliminar el estudiante";
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                const data = err.response?.data as any;

                if (status === 404) {
                    return true;
                }

                message = data?.message || err.message || message;
            } else {
                console.error("Error inesperado:", err);
            }

            toastService.error(message);
            setError(err);
            return false;
        }
    };
    return { execute, loading, error }
};
