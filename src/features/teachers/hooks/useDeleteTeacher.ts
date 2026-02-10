import { useState } from "react";
import { deleteTeacher } from "../services/teacherService";
import { toastService } from "../../../shared/services/toastService";
import axios from "axios";

export const useDeleteTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteTeacher(id);
      return true;
    } catch (err: unknown) {
      let message = "Error al eliminar el profesor";

      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const data = err.response?.data as any;

        if (status === 404) {
          //message = data?.message || "Registro no encontrado";
          //toastService.info(message);
          return true; // éxito lógico
        }

        message = data?.message || err.message || message;
      } else {
        console.error("Error inesperado:", err);
      }

      toastService.error(message);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
