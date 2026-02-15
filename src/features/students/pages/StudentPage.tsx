import { useState } from "react";
import { useStudents } from "../hooks/useStudents";
import type { StudentResponse } from "../types/studentResponse";
import { StudentTable } from "../components/StudentTable";
import { StudentCreateModal } from "../components/StudentCreateModal";
import { StudentEditModal } from "../components/StudentEditModal";
import { ConfirmModal } from "../../../shared/components/modal-confirm/ConfirmModal";
import { toastService } from "../../../shared/services/toastService";
import { useDeleteStudent } from "../hooks/useDeleteStudent";

export const StudentPage = () => {
  const { students, loading, error, fetchStudents, setStudents } =
    useStudents();
  const { execute: deleteStudent, loading: deleting } = useDeleteStudent();
  const [editingStudent, setEditingStudent] = useState<StudentResponse | null>(
    null,
  );
  const [studentToDelete, setStudentToDelete] =
    useState<StudentResponse | null>(null);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar profesores</p>;

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;

    const success = await deleteStudent(studentToDelete.idStudent);

    if (success) {
      setStudents((prev) =>
        prev.filter((t) => t.idStudent !== studentToDelete.idStudent),
      );
      toastService.success("Estudiante eliminado correctamente");
    }
    setStudentToDelete(null);
  };
  return (
    <div>
      <h1>Estudiantes</h1>

      <StudentCreateModal onSuccess={fetchStudents} />

      <StudentTable
        students={students}
        onEdit={setEditingStudent}
        onDelete={setStudentToDelete}
      />

      {editingStudent && (
        <StudentEditModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSuccess={fetchStudents}
        />
      )}

      <ConfirmModal
        open={!!studentToDelete}
        title="Eliminar Estudiante"
        message={`¿Seguro que deseas eliminar al estudiante ${studentToDelete?.firstName} ${studentToDelete?.lastName}?`}
        loading={deleting}
        onCancel={() => setStudentToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
