import { useState } from "react";
import { TeacherCreateModal } from "../components/TeacherCreateModal";
import { TeacherTable } from "../components/TeacherTable";
import { useTeachers } from "../hooks/useTeacher";
import { TeacherEditModal } from "../components/TeacherEditModal";
import type { TeacherResponse } from "../types/teacherResponse";
import { toastService } from "../../../shared/services/toastService";
import { ConfirmModal } from "../../../shared/components/modal-confirm/ConfirmModal";
import { useDeleteTeacher } from "../hooks/useDeleteTeacher";

export const TeacherPage = () => {
  const { teachers, loading, error, fetchTeachers, setTeachers } = useTeachers();
  const {execute:deleteTeacher, loading: deleting} = useDeleteTeacher();
  const [editingTeacher, setEditingTeacher] = useState<TeacherResponse | null>(
    null,
  );
  const [teacherToDelete, setTeacherToDelete] =
    useState<TeacherResponse | null>(null);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar profesores</p>;

  const handleConfirmDelete = async () => {
    if (!teacherToDelete) return;

    const success = await deleteTeacher(teacherToDelete.idTeacher);

    if (success) {
      setTeachers((prev) => 
      prev.filter((t) => t.idTeacher !== teacherToDelete.idTeacher));
      toastService.success("Profesor eliminado correctamente");
      //fetchTeachers();
      
    } 
    setTeacherToDelete(null);
  };

  return (
    <div>
      <h1>Profesores</h1>

      <TeacherCreateModal onSuccess={fetchTeachers} />

      <TeacherTable
        teachers={teachers}
        onEdit={setEditingTeacher}
        onDelete={setTeacherToDelete}
      />

      {editingTeacher && (
        <TeacherEditModal
          teacher={editingTeacher}
          onClose={() => setEditingTeacher(null)}
          onSuccess={fetchTeachers}
        />
      )}

      <ConfirmModal
        open={!!teacherToDelete}
        title="Eliminar Profesor"
        message={`¿Seguro que deseas eliminar al profesor ${teacherToDelete?.firstName} ${teacherToDelete?.lastName}?`}
        loading={deleting}
        onCancel={() => setTeacherToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
