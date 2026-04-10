import type { TeacherResponse } from "../types/teacherResponse";
import type { CreateTeacherRequest } from "../types/createTeacherRequest";
import api from "../../../services/api";

const URL = "/v1/teachers";

export const getTeachers = async (): Promise<TeacherResponse[]> => {
    const res = await api.get(URL);
    return res.data ?? [];
};

export const getTeacherById = async (id: number): Promise<TeacherResponse | null> => {
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

export const createTeacher = async (data: CreateTeacherRequest): Promise<TeacherResponse> => {
    const res = await api.post(URL, data);
    return res.data;
};

export const updateTeacher = async (id: number, data: CreateTeacherRequest): Promise<TeacherResponse> => {
    const res = await api.put(`${URL}/${id}`, data);
    return res.data;

};

export const deleteTeacher = async (id: number): Promise<void> => {
    try {
        await api.delete(`${URL}/${id}`);
    } catch (err: any) {
        throw err;
    }
};