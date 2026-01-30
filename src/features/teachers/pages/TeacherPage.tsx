import { useState } from "react";
import { TeacherCreateModal } from "../components/TeacherCreateModal";
import { TeacherTable } from "../components/TeacherTable";
import { useTeachers } from "../hooks/useTeacher";
import { TeacherEditModal } from "../components/TeacherEditModal";
import type { TeacherResponse } from "../types/teacherResponse";

export const TeacherPage = () => {
  const { teachers, loading, error, fetchTeachers } = useTeachers();
  const [editingTeacher, setEditingTeacher] = useState<TeacherResponse | null>(
    null,
  );
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar profesores</p>;
  return (
    <div>
      <h1>Profesores</h1>

      <TeacherCreateModal onSuccess={fetchTeachers} />

      <TeacherTable
        teachers={teachers}
        onEdit={(teacher) => setEditingTeacher(teacher)}
      />

      {editingTeacher && (
        <TeacherEditModal
          teacher={editingTeacher}
          onClose={() => setEditingTeacher(null)}
          onSuccess={fetchTeachers}
        />
      )}
    </div>
  );
};
