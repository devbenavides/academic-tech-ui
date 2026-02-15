import { useEffect, useState } from "react";
import type { StudentResponse } from "../types/studentResponse";
import { getStudents } from "../services/studentService";

export const useStudents = () => {
    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getStudents();
            setStudents(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchStudents();
    }, []);

    return { students, loading, error, fetchStudents, setStudents };
};