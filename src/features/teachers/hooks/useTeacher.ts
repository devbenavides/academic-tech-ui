import { useState, useEffect } from "react";
import { getTeachers } from "../services/teacherService";
import type { TeacherResponse } from "../types/teacherResponse";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<TeacherResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchTeachers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return { teachers, loading, error, fetchTeachers, setTeachers };
};
