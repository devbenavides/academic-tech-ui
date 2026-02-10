import api from "../../../services/api";
import type { CreateStudentRequest } from "../types/createStudentRequest";
import type { StudentResponse } from "../types/studentResponse";

const URL = "/api/v1/students";

export const getStudents = async (): Promise<StudentResponse[]> => {
    const res = await api.get(URL);
    return res.data ?? [];
};

export const getStudentById = async (id: number): Promise<StudentResponse | null> => {
    try {
        const res = await api.get(`${URL}/${id}`);
        return res.data;
    } catch (error: any) {
        if (error.message.includes("404")) {
            return null;
        }
        throw error;
    }
};

export const createStudent = async (data: CreateStudentRequest): Promise<StudentResponse> => {
    const res = await api.post(URL, data);
    return res.data;
};

export const updateStudent = async (id: number, data: CreateStudentRequest): Promise<StudentResponse> => {
    const res = await api.put(`${URL}/${id}`, data);
    return res.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
    try {
        await api.delete(`${URL}/${id}`);
    } catch (err: any) {
        throw err;
    }
};