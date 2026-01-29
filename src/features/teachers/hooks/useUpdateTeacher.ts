import { useState } from "react";
import { updateTeacher } from "../services/teacherService";
import type { TeacherResponse } from "../types/teacherResponse";
import type { CreateTeacherRequest } from "../types/createTeacherRequest";

export const useUpdateTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = async (id: number, payload: CreateTeacherRequest): Promise<TeacherResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateTeacher(id, payload);
      return res;
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
