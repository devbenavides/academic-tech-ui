import { useState } from "react";
import { deleteTeacher } from "../services/teacherService";

export const useDeleteTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteTeacher(id);
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
