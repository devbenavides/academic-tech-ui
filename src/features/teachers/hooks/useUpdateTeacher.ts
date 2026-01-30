import { useState } from "react";
import { updateTeacher } from "../services/teacherService";
import type { TeacherResponse } from "../types/teacherResponse";
import type { CreateTeacherFormValues } from "../validation/types";
import { mapCreateTeacherFormDTO } from "../mappers/mapCreateTeacherFormDTO";
import type { BackendErrorResponse } from "../../../shared/types/backendErrors";

export const useUpdateTeacher = () => {
  const [loading, setLoading] = useState(false);

  const execute = async (id: number, payload: CreateTeacherFormValues): Promise<TeacherResponse | null> => {
    setLoading(true);
    try {
      const request = mapCreateTeacherFormDTO(payload);
      return await updateTeacher(id, request);
    } catch (err: any) {
      if (err?.response?.data) {
        const backendError = err.response.data as BackendErrorResponse;
        throw backendError;
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
};
